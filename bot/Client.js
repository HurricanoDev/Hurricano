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
/**
 * Extend Client class
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
    this.db = require("./handlers/db.js");
    /**
     * Logger
     */
    this.logger = require("./utilities/logger.js");
    /**
     * Import Schemas
     */
    this.schemas = {
      guild: require("./schemas/guild"),
    };

    /**
     * Cooldowns
     */
    this.cooldowns = new Discord.Collection();

    /**
     * Snipes
     */
    this.snipes = new Discord.Collection();

    /**
     * Giveaways Manager
     */
    this.giveawaysManager = new giveawaysManager(this, {
      updateCountdownEvery: 6969,
      default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#034ea2",
        reaction: "🎉",
      },
    }, false);

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
        this.once(event.name, (...args) => event.run(...args, this));
      } else {
        this.on(event.name, (...args) => event.run(...args, this));
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
        // WEBSOCKET EVENTS
        const wsevents = fs
        .readdirSync("./bot/events/ws")
        .filter((file) => file.endsWith(".js"));
      for (const file of wsevents) {
        const event = require(`./events/ws/${file}`);
        this.ws.on(event.name, (...args) => event.run(...args, this));
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
      .readdirSync("./bot/structures")
      .filter((file) => file.endsWith(".js"));

    for (const file of structures) {
      require("./structures/" + file);
    }
  }

  loadCommands() {
    readdirSync("./bot/commands").forEach((dir) => {
      const commands = readdirSync(`./bot/commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );
      try {
        for (let file of commands) {
          const props = new (require(`./commands/${dir}/${file}`))(this);
          if (props.name) {
            table.addRow(file, props.help.name, "Loaded!");
          } else {
            table.addRow(
              file,
              pull.name,
              "Not Loaded -> Missing a help.name, or help.name is not a string."
            );
            continue;
          }
          if (props.init) {
            props.init(this);
          }
          this.commands.set(props.help.name, props);
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
