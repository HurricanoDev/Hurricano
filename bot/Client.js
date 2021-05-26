const Discord = require("discord.js");
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command File", "Command Name", "Load status");
const fs = require("fs");
const { Player } = require("discord-player");
const giveawaysManager = require("./utilities/giveaway");
const logger = require("./utilities/logger.js");
const path = require("path");
let configFile;
const Database = require('./handlers/db.js');
/**
 * Extended Client class
 * @extends Discord.Client
 */
class Client extends Discord.Client {
  /**
   * Create a new client
   * @param {Object} config
   * @param {ClientOptions} options
   */
  constructor(config, options = {}) {
    super(options);

    /**
     * Add Credentials
     */
    this.config = config;

    this.globalPrefix = "hr!";
    this.token = config.token;

    /**
     * Commands
     */
    this.commands = new Discord.Collection();

    /**
     * Aliases
     */
    this.aliases = new Discord.Collection();
    
    /**
     * Mongo Database
     * @type {Object}
     */
    this.db = new Database(this, this.config.mongouri);
    /**
     * Logger
     */
    this.logger = require("./utilities/logger.js");
    /**
     * Import Schemas
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
     */
    this.snipes = new Discord.Collection();

    /**
     * Channels
     */
    this.bugReportChannel = this.channels.cache.get(
      this.config.botChannels.bugReport
    );
    this.feedbackChannel = this.channels.cache.get(
      this.config.botChannels.feedback
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

    /*
     * Cache
     */
    this.cache = {};

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
        await new this.schemas.user({
          name: userObj.name,
          id: userObj.id,
        });
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

        if (returnAuthor && !user) return message.author;
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
    };
  }
  // ---------------------------------------------------   Functions    -------------------------------------------------------------
  loadEvents() {
    // BOT EVENTS
    const botevents = fs
      .readdirSync("./bot/events/bot")
      .filter((file) => file.endsWith(".js"));
    for (const file of botevents) {
      const event = require(`./events/bot/${file}`);
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
  loadStructures() {
    const structures = fs
      .readdirSync("./bot/structures/ImmediateExecute")
      .filter((file) => file.endsWith(".js"));

    for (const file of structures) {
      require("./structures/ImmediateExecute/" + file);
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
            table.addRow(file, props.name, "Loaded!");
          } else {
            table.addRow(
              file,
              props.name,
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
  loadTopgg() {
    if (this.config.topggapi && typeof this.config.topggapi === "boolean") {
      let DBL = require("dblapi.js");
      let dbl = new DBL(this.config.toptoken, this);
      super.on("ready", () => {
        setInterval(() => {
          dbl.postStats(this.guilds.cache.size);
        }, 900000);
      });
    }
  }
}
module.exports = Client;
