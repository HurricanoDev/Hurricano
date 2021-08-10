const Discord = require("discord.js"),
  { readdirSync } = require("fs"),
  ascii = require("ascii-table"),
  { Player } = require("discord-player"),
  GiveawayManager = require("./GiveawayManager.js"),
  logger = require("../../utilities/logger.js"),
  Database = require("../../handlers/db.js"),
  { Lyrics } = require("@discord-player/extractor");

const table = new ascii("Commands");
table.setHeading(
  "Command File",
  "Command Name",
  "Command Category",
  "Aliases",
  "Load status",
);

/**
 * Extended Client class
 * @extends {Discord.Client}
 */
class HurricanoClient extends Discord.Client {
  /**
   * Create a new client
   * @param {Object} config
   * @param {ClientOptions} options
   */
  constructor(config, options = {}) {
    super(options);

    /**
     * Config credentials.
     * @type {Object}
     *
     */

    this.config = config;
    this.map = {};

    /**
     * Default prefix.
     * @type {String}
     */
    this.globalPrefix = "hr!";
    this.token = config.token;

    /**
     * Commands
     */
    this.commands = new Discord.Collection();

    /**
     * AFK map.
     * @type {Discord.Collection}
     */
    this.afk = new Discord.Collection();

    /**
     * Anti-Spam
     */
    this.usersMap = new Map();

    /**
     * Aliases
     * @type []
     */
    this.aliases = new Discord.Collection();

    /**
     * Mongo Database
     * @type {Object}
     */
    this.db = new Database(this, this.config.mongouri);
    /**
     * Logger
     * @type {Object}
     */
    this.logger = require("../../utilities/logger.js");
    /**
     * Import Schemas
     * @type {Object}
     */
    this.schemas = {
      guild: require("../../schemas/guild.js"),
      user: require("../../schemas/user"),
    };
    /*
     * Levelling
     */
    this.levels = require("../../utilities/Levels.js");

    /**
     * Snipes
     * @type {Object}
     */
    this.snipes = {
      edited: new Discord.Collection(),
      deleted: new Discord.Collection(),
      recent: new Discord.Collection(),
    };

    /**
     * Command types.
     * @types {Array}
     */

    this.command.types = readdirSync("./bot/commands").filter((x) =>
      [".js", ".json"].some((d) => !x.includes(d)),
    );

    /**
     * Channels
     */
    this.bugReportChannel = this.channels.cache.get(
      this.config.botChannels.bugReport,
    );
    this.feedbackChannel = this.channels.cache.get(
      this.config.botChannels.feedback,
    );
    this.progressChannel = this.channels.cache.get(
      this.config.botChannels.serverJoinChannel,
    );

    /**
     * Giveaways Manager
     */
    this.giveawaysManager = new GiveawayManager({
      initOnStart: false,
      client: this,
      ManagerOptions: {
        updateCountdownEvery: 6969,
        default: {
          botsCanWin: false,
          exemptPermissions: [],
          embedColor: "#034ea2",
          reaction: "🎉",
        },
      },
    });

    /**
     * E m o j i s
     * @type {Object}
     */
    this._emojis = require("../../utilities/emojis.json");

    /**
     * Music
     */
    this.player = new Player(this);

    /**
     * Filters for Moosik
     */
    this.filters = [
      "8D",
      "gate",
      "haas",
      "phaser",
      "treble",
      "tremolo",
      "vibrato",
      "reverse",
      "karaoke",
      "flanger",
      "mcompand",
      "pulsator",
      "subboost",
      "bassboost",
      "vaporwave",
      "nightcore",
      "normalizer",
      "surrounding",
    ];

    /**
     * Lyrics Client
     * @param {Object}
     */
    this.lyricsClient = Lyrics.init();

    this.links = {
      errorImage:
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png",
      successImage:
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png",
    };
    this.functions = {
    };
  }
  // ---------------------------------------------------   Functions    -------------------------------------------------------------
  loadEvents() {
    // BOT EVENTS
    const botevents = readdirSync("./bot/events/bot").filter((file) =>
      file.endsWith(".js"),
    );
    for (const file of botevents) {
      let event = require(`./events/bot/${file}`);
      event = new event(this);
      if (event.once) {
        super.once(event.name, (...args) => event.run(...args, this));
      } else {
        super.on(event.name, (...args) => event.run(...args, this));
      }
    }
    // MUSIC EVENTS
    const musicevents = readdirSync("./bot/events/music").filter((file) =>
      file.endsWith(".js"),
    );
    for (const file of musicevents) {
      const event = require(`./events/music/${file}`);
      this.player.on(event.name, (...args) => event.run(...args, this));
    }

    // GIVEAWAYS EVENTS
    const giveawaysevents = readdirSync("./bot/events/giveaways").filter(
      (file) => file.endsWith(".js"),
    );
    for (const file of giveawaysevents) {
      const event = require(`./events/giveaways/${file}`);
      this.giveawaysManager.on(event.name, (...args) =>
        event.run(...args, this),
      );
    }
  }
  loadCommands() {
    readdirSync("./bot/commands").forEach((dir) => {
      const commands = readdirSync(`./bot/commands/${dir}/`).filter((file) =>
        file.endsWith(".js"),
      );
      try {
        for (let file of commands) {
          const props = require(`./commands/${dir}/${file}`);
          if (props.name) {
            table.addRow(
              file,
              props.name,
              dir,
              props.aliases ? props.aliases.join(", ") : "None.",
              "Loaded!",
            );
          } else {
            table.addRow(
              file,
              props.name,
              dir,
              props.aliases ? props.aliases.join(", ") : "None.",
              "Not Loaded -> Missing a help.name, or help.name is not a string.",
            );
            continue;
          }
          props.category = dir;
          this.commands.set(props.name, props);
          if (props.aliases) {
            props.conf.aliases.forEach((alias) => {
              this.aliases.set(alias, props.help.name);
            });
          }
        }
      } catch (e) {
        logger.error(e);
      }
    });
    logger.client("\n" + table.toString());
  }
  connect() {
    return this.login(this.config.token);
  }
  getCommand(command) {
    return (
      this.commands.get(command) || this.commands.get(this.aliases.get(command))
    );
  }
  async loadTopgg() {
    if (this.config.topgg.enabled) {
      const DBL = require("@top-gg/sdk");
      const guildCount = new DBL.Api(this.config.topgg.token);

      await super.on("ready", () => {
        setInterval(() => {
          guildCount.postStats({
            serverCount: this.guilds.cache.size,
            shardId: this.shard.ids[0], // if you're sharding
            shardCount: this.options.shardCount,
          });
        }, 900000);
      });

      if (this.config.topgg.webhook.enabled) {
        const app = require("express")();
        const voteWebhook = new DBL.Webhook(this.config.topgg.webhookPassword);
        // voteWebhook.on("ready", (hook) => {
        //   this.logger.info(
        //     `Vote webhook ready at http://${hook.hostname}:${hook.port}${hook.path}!`
        //   );
        // });
        const thisSelf = this;
        await app.post(
          "/dblwebhook",
          voteWebhook.listener(async (vote) => {
            const channel = await thisSelf.channels.resolve(
              this.config.topgg.webhook.channelID,
            );
            const user = await this.users.resolve(vote.user);
            const embed = new Discord.MessageEmbed()
              .setAuthor(user.username, user.displayAvatarURL())
              .setDescription(
                `${user} just voted! Poggers! Sending them a thank message right now!`,
              )
              .setThumbnail(user.displayAvatarURL())
              .setFooter(user.tag)
              .setTimestamp()
              .setColor("#FFD700");
            channel.send({ embeds: [embed] });
            this.logger.info(`User with ID ${user.tag} just voted!`);

            const dmEmbed = new Discord.MessageEmbed()
              .setTitle("Thanks for your vote!")
              .setDescription(
                `Hey **${user.username}**, thanks so much for your vote! This helps us in unimaginable ways!`,
              )
              .setThumbnail(
                "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/other/VotePog.png",
              )
              .setColor("GREEN");

            await user.send({ embeds: [dmEmbed] }).catch(() => {});
            const userdb = this.db.users.cache.get(user.id);
            if (userdb.voteReminder) {
              setTimeout(() => {
                user.send(
                  "Hey! You can vote for me again! It's been 12 hours since you last voted. Click [here](https://top.gg/bot/803169312827113483/vote) to vote.",
                );
              }, 43200000);
            }
          }),
        );
        const port = process.env.PORT || this.config.topgg.webhook.webhookPort;
        app.listen(port, this.config.topgg.webhook.webhookIP);
      }
    }
  }
}
function loadStructures() {
  const structures = readdirSync("./bot/structures/ImmediateExecute").filter(
    (file) => file.endsWith(".js"),
  );

  for (const file of structures) {
    require("./structures/ImmediateExecute/" + file);
  }
}
module.exports = {
  loadStructures,
  HurricanoClient,
};
