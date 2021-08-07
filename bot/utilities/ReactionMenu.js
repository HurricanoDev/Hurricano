const { EventEmitter } = require('events');
const requiredPerms = [
  'SEND_MESSAGES',
  'EMBED_LINKS',
  'ADD_REACTIONS',
  'MANAGE_MESSAGES',
];

/**
 * A page object that the menu can display.
 */
class Page {
  /**
   * Creates a menu page.
   * @param {string} name The name of this page, used as a destination for reactions.
   * @param {import('discord.js').MessageEmbed} content The MessageEmbed content of this page.
   * @param {Object.<string, string | function>} reactions The reactions that'll be added to this page.
   * @param {number} index The index of this page in the Menu
   */
  constructor(name, content, reactions, index) {
    this.name = name;
    this.content = content;
    this.reactions = reactions;
    this.index = index;
  }
}

/**
 * A menu with customisable reactions for every page.
 * Blacklisted page names are: `first, last, previous, next, stop, delete`.
 * These names perform special functions and should only be used as reaction destinations.
 */
module.exports.Menu = class extends EventEmitter {
  /**
   * Creates a menu.
   * @param {import('discord.js').TextChannel} channel The text channel you want to send the menu in.
   * @param {String} userID The ID of the user you want to let control the menu.
   * @param {Object[]} pages An array of page objects with a name, content MessageEmbed and a set of reactions with page names which lead to said pages.
   * @param {String} pages.name The page's name, used as a destination for reactions.
   * @param {import('discord.js').MessageEmbed} pages.content The page's embed content.
   * @param {Object.<string, string | function>} pages.reactions The reaction options that the page has.
   * @param {Number} ms The number of milliseconds the menu will collect reactions for before it stops to save resources. (seconds * 1000)
   *
   * @remarks
   * Blacklisted page names are: `first, last, previous, next, stop, delete`.
   * These names perform special functions and should only be used as reaction destinations.
   */
  constructor(channel, author, pages, ms = 180000) {
    super();
    this.channel = channel;
    this.userID = author.id;
    this.ms = ms;
    this.author = author;

    const missingPerms = [];
    // this usually means it's a dm channel that hasn't been created
    if (!this.channel) {
      this.channel.client.users.cache.get(this.userID).createDM(true);
    }
    if (this.channel.type !== 'dm') {
      requiredPerms.forEach((perm) => {
        if (
          !this.channel
            .permissionsFor(this.channel.client.user)
            .toArray()
            .includes(perm)
        ) {
          missingPerms.push(perm);
        }
      });
      if (missingPerms.length)
        this.channel.send(
          `Looks like you haven't given the client ${missingPerms.join(
            ', ',
          )} permissions in #${
            this.channel
          }. This perm is needed for basic menu operation. You'll probably experience problems using menus in this channel.`,
        );
    } else {
      throw new Error('ReactionMenu is being sent as a DM.');
    }

    /**
     * List of pages available to the Menu.
     * @type {Page[]}
     */
    this.pages = [];

    let i = 0;
    pages.forEach((page) => {
      this.totalReactions = page.reactions;
      page.reactions = {};
      Object.entries(this.totalReactions).forEach((reaction) => {
        if (!reaction[1]) return;
        page.reactions[reaction[0]] = reaction[1];
      });
      this.pages.push(new Page(page.name, page.content, page.reactions, i));
      i++;
    });

    /**
     * The page the Menu is currently displaying in chat.
     * @type {Page}
     */
    this.currentPage = this.pages[0];
    /**
     * The index of the Pages array we're currently on.
     * @type {Number}
     */
    this.pageIndex = 0;
  }

  /**
   * Send the Menu and begin listening for reactions.
   */
  start() {
    this.emit('pageChange', this.currentPage);
    this.channel
      .send({ embeds: [this.currentPage.content] })
      .then((menu) => {
        this.menu = menu;
        this.addReactions();
        this.awaitReactions();
      })
      .catch((error) => {
        if (this.channel.type === 'dm') {
          this.channel
            .sendError(
              message,
              'Error!',
              'Failed to send the menu in your DMs! Please ensure they are open.',
            )
            .catch((e) => {});
        } else {
          this.author
            .send(
              `${error.toString()} (whilst trying to send menu message) | You're probably missing 'SEND_MESSAGES' or 'EMBED_LINKS' in #${
                this.channel.name
              } (${
                this.channel.guild.name
              }), needed for sending the menu message.`,
            )
            .catch(() => {});
        }
      });
  }

  /**
   * Stop listening for new reactions.
   */
  stop() {
    if (this.reactionCollector) {
      this.reactionCollector.stop();
      this.clearReactions();
    }
  }

  /**
   * Delete the menu message.
   */
  delete() {
    if (this.reactionCollector) this.reactionCollector.stop();
    if (this.menu) this.menu.delete();
  }

  /**
   * Remove all reactions from the menu message.
   */
  clearReactions() {
    if (this.menu) {
      return this.menu.reactions.removeAll().catch((error) => {
        if (this.channel.type === 'dm') {
          throw new Error(
            `Error due to sending ReactionMenu in DMs: ${error.toString()}.`,
          );
        } else {
          this.channel.send(
            `${error.toString()} (whilst trying to remove message reactions) | You've probably not given the client 'MANAGE_MESSAGES' permissions in #${
              this.channel
            }, needed for removing reactions when changing pages.`,
          );
        }
      });
    }
  }

  /**
   * Jump to a new page in the Menu.
   * @param {Number} page The index of the page the Menu should jump to.
   */
  setPage(page = 0) {
    this.emit('pageChange', this.pages[page]);

    this.pageIndex = page;
    this.currentPage = this.pages[this.pageIndex];
    this.menu.edit({ embeds: [this.currentPage.content] });

    this.reactionCollector.stop();
    this.addReactions();
    this.awaitReactions();
  }

  /**
   * React to the new page with all of it's defined reactions
   */
  addReactions() {
    for (const reaction in this.currentPage.reactions) {
      this.menu.react(reaction).catch((error) => {
        if (error.toString().indexOf('Unknown Emoji') >= 0) {
          throw new Error(
            `${error.toString()} (whilst trying to add reactions to message) | The emoji you were trying to add to page "${
              this.currentPage.name
            }" (${reaction}) probably doesn't exist. You probably entered the ID wrong when adding a custom emoji.`,
          );
        } else {
          this.channel.send(
            `${error.toString()} (whilst trying to add reactions to message) | You're probably missing 'ADD_REACTIONS' in #${
              this.channel.name
            } (${
              this.channel.guild.name
            }), needed for adding reactions to the page.`,
          );
        }
      });
    }
  }

  /**
   * Start a reaction collector and switch pages where required.
   */
  awaitReactions() {
    this.reactionCollector = this.menu.createReactionCollector({
      idle: this.ms,
      filter: (reaction, user) => user.id !== this.menu.client.user.id,
    });

    let sameReactions;
    this.reactionCollector.on('end', (reactions) => {
      // Whether the end was triggered by pressing a reaction or the menu just ended.
      if (reactions.first()) {
        reactions
          .first()
          .users.remove(this.menu.client.users.cache.get(this.userID));
      }
    });

    this.reactionCollector.on('collect', (reaction, user) => {
      // If the name exists, prioritise using that, otherwise, use the ID. If neither are in the list, don't run anything.
      const reactionName = Object.prototype.hasOwnProperty.call(
        this.currentPage.reactions,
        reaction.emoji.name,
      )
        ? reaction.emoji.name
        : Object.prototype.hasOwnProperty.call(
            this.currentPage.reactions,
            reaction.emoji.id,
          )
        ? reaction.emoji.id
        : null;

      // If a 3rd party tries to add reactions or the reaction isn't registered, delete it.
      if (
        user.id !== this.author.id ||
        !Object.keys(this.currentPage.reactions).includes(reactionName)
      ) {
        return reaction.users.remove(user);
      }
      if (reactionName) {
        if (typeof this.currentPage.reactions[reactionName] === 'function') {
          return this.currentPage.reactions[reactionName]();
        }

        switch (this.currentPage.reactions[reactionName]) {
          case 'first':
            sameReactions =
              JSON.stringify(this.menu.reactions.cache.keyArray()) ===
              JSON.stringify(Object.keys(this.pages[0].reactions));
            this.setPage(0);

            break;
          case 'last':
            sameReactions =
              JSON.stringify(this.menu.reactions.cache.keyArray()) ===
              JSON.stringify(
                Object.keys(this.pages[this.pages.length - 1].reactions),
              );
            this.setPage(this.pages.length - 1);
            break;
          case 'previous':
            if (this.pageIndex > 0) {
              sameReactions =
                JSON.stringify(this.menu.reactions.cache.keyArray()) ===
                JSON.stringify(
                  Object.keys(this.pages[this.pageIndex - 1].reactions),
                );
              this.setPage(this.pageIndex - 1);
            }
            break;
          case 'next':
            if (this.pageIndex < this.pages.length - 1) {
              sameReactions =
                JSON.stringify(this.menu.reactions.cache.keyArray()) ===
                JSON.stringify(
                  Object.keys(this.pages[this.pageIndex + 1].reactions),
                );
              this.setPage(this.pageIndex + 1);
            }
            break;
          case 'stop':
            this.stop();
            break;
          case 'delete':
            this.delete();
            break;
          default:
            sameReactions =
              JSON.stringify(this.menu.reactions.cache.keyArray()) ===
              JSON.stringify(
                Object.keys(
                  this.pages.find(
                    (p) => p.name === this.currentPage.reactions[reactionName],
                  ).reactions,
                ),
              );
            this.setPage(
              this.pages.findIndex(
                (p) => p.name === this.currentPage.reactions[reactionName],
              ),
            );
            break;
        }
      }
    });
  }
};
