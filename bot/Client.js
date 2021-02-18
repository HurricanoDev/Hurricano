const Discord = require('discord.js');
const { readdirSync } = require('fs');

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
    this.db = require('./handlers/db.js')

    /**
     * Import Schemas
     */
    this.schemas = {
      guild: require('./schemas/guild')
    }

    /**
     * Cooldowns
     */
    this.cooldowns = new Discord.Collection();

    /**
     * E m o j i s
     * @type {Object}
     */
    this.emojis = require('./utilities/emojis.json')

  }

  // ---------------------------------------------------   Functions    -------------------------------------------------------------
  loadEvents() {
    const evtFiles = readdirSync("./bot/events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
      const eventName = file.split(".")[0];
      console.log(`Loading Event: ${eventName}`);
      const event = require(`./bot/events/${file}`);
      super.on(eventName, event.bind(null, this));
    });
    }
  loadCommands(){
    readdirSync("./bot/commands").forEach(dir => {
        const commands = readdirSync(`./bot/commands/${dir}/`).filter(file =>
          file.endsWith(".js")
        );
        for (let file of commands) {
          let pull = require(`../commands/${dir}/${file}`);
          if (pull.name) {
            this.commands.set(pull.name, pull);
            table.addRow(file, pull.name, "Loaded!");
          } else {
            table.addRow(
              file,
              pull.name,
              "Not Loaded -> Missing a help.name, or help.name is not a string."
            );
            continue;
          }
          if (pull.aliases && Array.isArray(pull.aliases))
            pull.aliases.forEach(alias => this.aliases.set(alias, pull.name));
        }
      });
  }
  loadTopgg() {
    if (this.config.topggapi && typeof this.config.topggapi === 'boolean') {
        let DBL = require("dblapi.js");
        let dbl = new DBL(this.config.toptoken, this);
        super.on('ready', () => {
         setInterval(() => {
             dbl.postStats(this.guilds.cache.size);
        }, 900000);
    });
    }
  }
}
module.exports = Client;