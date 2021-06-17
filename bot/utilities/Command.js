const logger = require("../utilities/logger.js");
const config = require("@config");
const Discord = require("discord.js");
const permissions = require("./permissions.js");
let name;
module.exports = class Command {
  constructor(opts) {
    this.constructor.validateOpts(opts), (this.client = client);
    this.name = opts.name || null;
    this.aliases = opts.aliases || null;
    this.usage = opts.usage || "No usage provided.";
    this.description = opts.description || "No description provided.";
    this.ownerOnly = opts.ownerOnly || false;
    this.examples = opts.examples || "No example provided.";
    this.cooldown = opts.cooldown || null;
    this.userPermissions = opts.userPermissions || null;
    this.clientPermissions = opts.clientPermissions || null;
    this.subCommands = opts.subCommands
      ? {
          commands: new _Collection(opts.subCommands.commands),
          baseAuthorization: opts.subCommands.baseAuthorization ?? null,
        }
      : null;
    this.run =
      opts.run ??
      function run() {
        if (!this.slash && !this.subCommands)
          throw new Error(`Command ${name} doesn't have a run method.`);
      };
    this.slash = {
      isSlash: opts.slash?.isSlash ?? false,
      isNormal: opts.slash?.isNormal ?? true,
      run:
        opts.slash?.run ??
        function run() {
          throw new Error(`Command ${name} doesn't have a slash run method.`);
        },
      name: opts.slash?.name ?? null,
      options: opts.slash?.options,
    };
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
      args,
      slash,
      run,
      subCommands,
    } = this;
    this.conf = {
      cooldown,
      ownerOnly,
      aliases,
      userPermissions,
      clientPermissions,
      args,
      slash,
      run,
      subCommands,
    };
    this.help = {
      name,
      description,
      usage,
      examples,
    };
  }
  static validateOpts(opts) {
    name = opts.name;
    if (!client) throw new Error("No client was found.");
    if (typeof opts !== "object")
      throw new TypeError(`Command: ${name}: Options are not an Object.`);
    if (typeof opts.name !== "string")
      throw new TypeError(`Command: ${name}: Name is not a string.`);
    if (opts.name !== opts.name.toLowerCase())
      throw new Error(`Command: ${name}: Name is not lowercase.`);
    if (opts.aliases) {
      if (
        (this.aliases && !Array.isArray(opts.aliases)) ||
        opts.aliases.some((ali) => typeof ali !== "string")
      )
        throw new TypeError(
          `Command: ${name}: Aliases are not an array of strings.`
        );

      if (opts.aliases.some((ali) => ali !== ali.toLowerCase()))
        throw new RangeError(`Command: ${name}: Aliases are not lowercase.`);

      for (const alias of opts.aliases) {
        if (client.aliases.get(alias))
          throw new Error(`Command: ${name}: Alias already exists.`);
      }
    }
    if (opts.usage && typeof opts.usage !== "string")
      throw new TypeError(`Command: ${name}: usage is not a string.`);
    if (opts.clientPermissions) {
      if (!Array.isArray(opts.clientPermissions))
        throw new TypeError(
          `Command: ${name}: User permissions(s) are not an array of permission key strings.`
        );
      for (const perm of opts.clientPermissions) {
        if (!permissions[perm])
          throw new RangeError(
            `Command: ${name}: Invalid command client permission(s): ${perm}`
          );
      }
    }

    if (opts.subCommands) {
      if (typeof opts.subCommands !== "object")
        throw new Error(`Command: ${name}: Subcommands list aren't an array.`);

      for (const sub of opts.subCommands.commands) {
        if (!Array.isArray(sub))
          throw new Error(
            `Command: ${name}: One of the subcommands aren't an array.`
          );
      }
    }

    if (opts.userPermissions) {
      if (!Array.isArray(opts.userPermissions))
        throw new TypeError(
          `Command: ${name}: User permissions(s) are not an array of permission key strings.`
        );
      for (const perm of opts.userPermissions) {
        if (!permissions[perm])
          throw new RangeError(
            `Command: ${name}: Invalid command user permission(s): ${perm}`
          );
      }
    }
    if (opts.examples && !Array.isArray(opts.examples))
      throw new TypeError(
        `Command: ${name}: Command examples is not an Array of permission key strings.`
      );
    if (opts.ownerOnly && typeof opts.ownerOnly !== "boolean")
      throw new TypeError(`Command: ${name}: ownerOnly is not a boolean.`);
  }
};
