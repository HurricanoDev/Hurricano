const Command = require("@Command");
const { MessageEmbed, MessageFlags } = require("discord.js");
const { readdirSync } = require("fs");
module.exports = class EnableCommand extends Command {
  constructor(client) {
    super(client, {
      name: "enable",
      descripton: "Enable a module.",
      userPermissions: ["ADMINISTRATOR"],
    });
  }
  async run(message, args) {
    let avaliableModules = readdirSync(`${process.cwd()}/bot/commands`);
    avaliableModules.splice((avaliableModules.indexOf('owner')), 1)
    const prefix = await client.db.guild.getPrefix(message.guild.id);
    const modulesEmbed = new MessageEmbed().setTitle("Avaliable Modules.");
    avaliableModules.forEach((d) =>
      modulesEmbed.addField(d, `\`${prefix}enable ${d}\``, true)
    );
    modulesEmbed.setFooter("Copyright Hurricano™");
    if (!args.length) return message.channel.send(modulesEmbed);
    const argss = args.shift().toLowerCase();
    if (!avaliableModules.includes(argss)) {
      const invalidEmbed = new MessageEmbed()
        .setTitle("Invalid Arguments Provided.")
        .setDescription("Available Modules:");
      avaliableModules.forEach((d) =>
        invalidEmbed.addField(d, `\`${prefix}enable ${d}\``)
      );
      message.channel.send(invalidEmbed);
      return;
    }
    if (avaliableModules.includes(argss)) {
      let guildSchema = await client.schemas.guild.findOne({
        id: message.guild.id,
      });
      let disabledModules = guildSchema.disabledModules;
      if (!disabledModules.includes(argss)) {
        message.channel.sendError(
          message,
          "Already Enabled.",
          "The module you provided is already enabled."
        );
        return;
      }

      const indexValue = disabledModules.indexOf(argss);
      disabledModules.splice(indexValue);
      guildSchema.disabledModules = disabledModules;
      await guildSchema.save();
      message.channel.sendSuccess(
        message,
        "Module Enabled.",
        `The module \`${argss}\` has been enabled.`
      );
    }
  }
};
