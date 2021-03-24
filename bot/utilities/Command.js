const logger = require("../utilities/logger.js");
const config = require("@config");
const Discord = require("discord.js");
const permissions = require("./permissions.js");

module.exports = class Command {
  constructor(client, opts) {
    this.constructor.validateOptions(client, opts), (this.client = client);
    this.name = opts.name || null;
    this.aliases = opts.aliases || null;
    this.usage = opts.usage || "No usage provided.";
    this.description = opts.description || "No description provided.";
    this.ownerOnly = opts.ownerOnly || false;
    this.examples = opts.examples || "No example provided.";
    this.cooldown = opts.cooldown || null;
    this.userPermissions = opts.userPermissions || null;
    this.clientPermissions = opts.clientPermissions || null;
    this.args = opts.args || null;
    const {
      cooldown,
      ownerOnly,
      aliases,
      userPermissions,
      clientPermissions,
      name,
      description,
      usage,
      examples,
      args
    } = this;
    this.conf = {
      cooldown,
      ownerOnly,
      aliases,
      userPermissions,
      clientPermissions,
      args
    };
    this.help = { name, description, usage, examples };
  }
  run(message, args) {
    throw new Error(`The ${this.name} command has no run() method`);
  }
  static validateOptions(client, opts) {
    if (!client) throw new Error("No client was found.");
    if (typeof opts !== "object")
      throw new TypeError(`Command: ${this.name}: Options are not an Object.`);
    if (typeof opts.name !== "string")
      throw new TypeError(`Command: ${this.name}: Name is not a string.`);
    if (opts.name !== opts.name.toLowerCase())
      throw new Error(`Command: ${this.name}: Name is not lowercase.`);
    if (opts.aliases) {
      if (this.aliases &&
        !Array.isArray(opts.aliases) ||
        opts.aliases.some((ali) => typeof ali !== "string")
      )
        throw new TypeError(
          `Command: ${this.name}: Aliases are not an array of strings.`
        );

      if (opts.aliases.some((ali) => ali !== ali.toLowerCase()))
        throw new RangeError(
          `Command: ${this.name}: Aliases are not lowercase.`
        );

      for (const alias of opts.aliases) {
        if (client.aliases.get(alias))
          throw new Error(`Command: ${this.name}: Alias already exists.`);
      }
    }
    if (opts.usage && typeof opts.usage !== "string")
      throw new TypeError(`Command: ${this.name}: usage is not a string.`);
    if (opts.clientPermissions) {
      if (!Array.isArray(opts.clientPermissions))
        throw new TypeError(
          `Command: ${this.name}: User permissions(s) are not an array of permission key strings.`
        );
      for (const perm of opts.clientPermissions) {
        if (!permissions[perm])
          throw new RangeError(
            `Command: ${this.name}: Invalid command client permission(s): ${perm}`
          );
      }
    }
    if (opts.userPermissions) {
      if (!Array.isArray(opts.userPermissions))
        throw new TypeError(
          `Command: ${this.name}: User permissions(s) are not an array of permission key strings.`
        );
      for (const perm of opts.userPermissions) {
        if (!permissions[perm])
          throw new RangeError(
            `Command: ${this.name}: Invalid command user permission(s): ${perm}`
          );
      }
    }
    if (opts.examples && !Array.isArray(opts.examples))
      throw new TypeError(
        `Command: ${this.name}: Command examples is not an Array of permission key strings.`
      );
    if (opts.ownerOnly && typeof opts.ownerOnly !== "boolean")
      throw new TypeError(`Command: ${this.name}: ownerOnly is not a boolean.`);
  }
};
