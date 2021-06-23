const Discord = require("discord.js");
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading(
  "Command File",
  "Command Name",
  "Command Category",
  "Aliases",
  "Load status"
);
const fs = require("fs");
const { Player } = require("discord-player");
const giveawaysManager = require("./utilities/giveaway");
const logger = require("./utilities/logger.js");
const path = require("path");
const Database = require("./handlers/db.js");

/**
 * Extended Client class
 * @extends Discord.Client
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
     * AFK
     * @param AFKMap
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
    this.logger = require("./utilities/logger.js");
    /**
     * Import Schemas
     * @type {Object}
     */
    this.schemas = {
      guild: require("./schemas/guild.js"),
      user: require("./schemas/user"),
    };
    /*
     * Levelling
     */
    this.levels = require("./utilities/Levels.js");

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
     * Channels
     */
    this.bugReportChannel = this.channels.cache.get(
      this.config.botChannels.bugReport
    );
    this.feedbackChannel = this.channels.cache.get(
      this.config.botChannels.feedback
    );
    this.progressChannel = this.channels.cache.get(
      this.config.botChannels.serverJoinChannel
    );

    /**
     * Giveaways Manager
     */
    this.giveawaysManager = new giveawaysManager(
      this,
      {
        updateCountdownEvery: 6969,
        default: {
          botsCanWin: false,
          exemptPermissions: [],
          embedColor: "#034ea2",
          reaction: "🎉",
        },
      },
      false
    );

    /**
     * E m o j i s
     * @type {Object}
     */
    this._emojis = require("./utilities/emojis.json");

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

    this.links = {
      errorImage:
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png",
      successImage:
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png",
    };
    this.functions = {
      createUserDB: async (userObj) => {
        const data = await new this.schemas.user({
          name: userObj.name,
          id: userObj.id,
        }).save();
        return data;
      },
      getMember: async (returnAuthor, message, ...args) => {
        if (!returnAuthor && returnAuthor !== false)
          throw new Error(`Returning message.author not specified.`);
        if (!message) throw new Error(`Message object not provided.`);
        if (!args.length) throw new Error(`Arguments string not provided.`);
        if (typeof returnAuthor !== "boolean")
          throw new Error(
            `Whether to return author or not option is not boolean.`
          );
        if (typeof message !== "object")
          throw new Error(`Message provided is not an object.`);
        args = args[0];
        let user;
        if (message.mentions.members.first())
          user = message.mentions.members.first();
        else user = await message.guild.members.fetch(args).catch(() => {});
        if (user && user.size) user = null;

        if (returnAuthor && !user) return message.member;
        if (user) return user;
        if (!user) return null;
      },
      getChannel: async (returnChannel, message, ...args) => {
        if (!returnChannel && returnChannel !== false)
          throw new Error(`Returning message.author not specified.`);
        if (!message) throw new Error(`Message object not provided.`);
        if (!args.length) throw new Error(`Arguments string not provided.`);
        if (typeof returnChannel !== "boolean")
          throw new Error(
            `Whether to return channel or not option is not boolean.`
          );
        if (typeof message !== "object")
          throw new Error(`Message provided is not an object.`);
        args = args[0];
        let user;
        if (message.mentions.channels.first())
          user =
            message.mentions.channels.first() ||
            message.guild.channels.cache.find((x) => x.name === args);
        else user = message.guild.channels.cache.get(args);
        if (returnChannel && !user) return message.channel;
        if (user) return user;
        if (!user) return null;
      },
      getOrdinalSuffix: (i) => {
        var j = i % 10,
          k = i % 100;
        if (j == 1 && k != 11) {
          return i + "st";
        }
        if (j == 2 && k != 12) {
          return i + "nd";
        }
        if (j == 3 && k != 13) {
          return i + "rd";
        }
        return i + "th";
      },
      randomInArray: (array) => {
        const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        return shuffledArray;
      },
      createOptionsEmbed: (command, message) => {
        const optionsEmbed = new Discord.MessageEmbed()
          .setAuthor(`${command.name} Help`, this.user.displayAvatarURL())
          .setColor("#606365")
          .addField(
            "Usage:",
            `${`\`${command.usage}\`` ?? "No usage provided."}`
          )
          .addField(
            "Permissions",
            command.userPermissions?.length
              ? command.userPermissions.map((x) => `\`${x}\``).join(", ")
              : "No user permissions required."
          )
          .addField("Subcommands:", `${options}`)
          .setFooter(
            `Type ${prefix}help <command> for more info on a command.`
          );

        return optionsEmbed;
      },
      hasNumber: (number) => {
        return /\d/.test(number);
      },
    };
  }
  // ---------------------------------------------------   Functions    -------------------------------------------------------------
  loadEvents() {
    // BOT EVENTS
    const botevents = fs
      .readdirSync("./bot/events/bot")
      .filter((file) => file.endsWith(".js"));
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
    const musicevents = fs
      .readdirSync("./bot/events/music")
      .filter((file) => file.endsWith(".js"));
    for (const file of musicevents) {
      const event = require(`./events/music/${file}`);
      this.player.on(event.name, (...args) => event.run(...args, this));
    }

    // GIVEAWAYS EVENTS
    const giveawaysevents = fs
      .readdirSync("./bot/events/giveaways")
      .filter((file) => file.endsWith(".js"));
    for (const file of giveawaysevents) {
      const event = require(`./events/giveaways/${file}`);
      this.giveawaysManager.on(event.name, (...args) =>
        event.run(...args, this)
      );
    }
  }
  loadCommands() {
    readdirSync("./bot/commands").forEach((dir) => {
      const commands = readdirSync(`./bot/commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
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
              "Loaded!"
            );
          } else {
            table.addRow(
              file,
              props.name,
              dir,
              props.aliases ? props.aliases.join(", ") : "None.",
              "Not Loaded -> Missing a help.name, or help.name is not a string."
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
              this.config.topgg.webhook.channelID
            );
            const user = await this.users.resolve(vote.user);
            const embed = new Discord.MessageEmbed()
              .setAuthor(user.username, user.displayAvatarURL())
              .setDescription(
                `${user} just voted! Poggers! Sending them a thank message right now!`
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
                `Hey **${user.username}**, thanks so much for your vote! This helps us in unimaginable ways!`
              )
              .setThumbnail(
                "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/other/VotePog.png"
              )
              .setColor("GREEN");

            await user.send({ embeds: [dmEmbed] }).catch(() => {});
            const userdb = this.db.users.cache.get(user.id);
            if (userdb.voteReminder) {
              setTimeout(() => {
                user.send(
                  "Hey! You can vote for me again! It's been 12 hours since you last voted. Click [here](https://top.gg/bot/803169312827113483/vote) to vote."
                );
              }, 43200000);
            }
          })
        );
        const port = process.env.PORT || this.config.topgg.webhook.webhookPort;
        app.listen(port, this.config.topgg.webhook.webhookIP);
      }
    }
  }
}
function loadStructures() {
  const structures = fs
    .readdirSync("./bot/structures/ImmediateExecute")
    .filter((file) => file.endsWith(".js"));

  for (const file of structures) {
    require("./structures/ImmediateExecute/" + file);
  }
}
module.exports = {
  loadStructures,
  HurricanoClient,
};
