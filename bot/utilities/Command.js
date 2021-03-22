const logger = require("../utilities/logger.js");

module.exports = class Command {
    constructor(client, opts) {
        this.constructor.validateOptions(client, options),
        this.client = client;
        this.name = opts.name || null;
        this.aliases = opts.aliases || null;
        this.usage = opts.usage || "No usage provided.";
        this.description = opts.description || 'No description provided.';
        this.ownerOnly = opts.ownerOnly || false;
        this.examples = opts.examples || "No example provided.";
        this.cooldown = opts.cooldowns || null;
    }
        run(message, args) {
            throw new Error(`The ${this.name} command has no run() method`);
        }
        static validateOptions(client, opts) {
        if (!client) throw new Error('No client was found.');
        if (typeof opts !== 'object') throw new TypeError(`Command: ${this.name}: Options are not an Object.`);
        if (typeof opts.name !== 'string') throw new TypeError(`Command: ${this.name}: Name is not a string.`);
        if (opts !== opts.name.toLowerCase()) throw new Error(`Command: ${this.name}: Name is not lowercase.`);
        if (opts.aliases) {
            if (!Array.isArray(opts.aliases) || opts.aliases.some(ali => typeof ali !== 'string'))
              throw new TypeError(`Command: ${this.name}: Aliases are not an array of strings.`);
      
            if (opts.aliases.some(ali => ali !== ali.toLowerCase()))
              throw new RangeError(`Command: ${this.name}: Aliases are not lowercase.`);
      
            for (const alias of opts.aliases) {
              if (client.aliases.get(alias)) throw new Error(`Command: ${this.name}: Alias already exists.`);
            }
          }
          if (opts.usage && typeof opts.usage !== 'string') throw new TypeError(`Command: ${this.name}: usage is not a string.`);
          if (opts.permissions.client) {
            if (!Array.isArray(opts.permissions.client))
              throw new TypeError(`Command: ${this.name}: User permissions(s) are not an array of permission key strings.`);
    }
    for (const perm of opts.permissions.client) {
        if (!permissions[perm]) throw new RangeError(`Command: ${this.name}: Invalid command client permission(s): ${perm}`);
      }
    if (opts.permissions.user) {
        if (!Array.isArray(opts.permissions.user))
          throw new TypeError(`Command: ${this.name}: User permissions(s) are not an array of permission key strings.`);
          for (const perm of opts.permissions.user) {
            if (!permissions[perm]) throw new RangeError(`Command: ${this.name}: Invalid command user permission(s): ${perm}`);
          }
        }
    if (opts.examples && !Array.isArray(opts.examples))
    throw new TypeError(`Command: ${this.name}: Command examples is not an Array of permission key strings.`);
 if (opts.ownerOnly && typeof opts.ownerOnly !== 'boolean') 
    throw new TypeError(`Command: ${this.name}: ownerOnly is not a boolean.`);

      if (!this.client.cooldowns.has(this.name)) {
        this.client.cooldowns.set(this.name, new Discord.Collection());
      }
      const now = Date.now();
      const timestamps = this.client.cooldowns.get(this.name);
      const cooldownAmount = (this.cooldown || 3) * 1000;

}}