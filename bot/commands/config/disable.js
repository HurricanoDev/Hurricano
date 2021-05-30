const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = new Command({
  name: "disable",
  descripton: "Disable a module.",
  userPermissions: ["ADMINISTRATOR"],
  async run(message, args) {
    let avaliableModules = readdirSync(`${process.cwd()}/bot/commands`);
    avaliableModules.splice(avaliableModules.indexOf("owner"), 1);
    const prefix = await client.db.guilds.getPrefix(message.guild.id);
    const modulesEmbed = new MessageEmbed().setTitle("Avaliable Modules.");
    avaliableModules.forEach((d) =>
      modulesEmbed.addField(d, `\`${prefix}disable ${d}\``, true)
    );
    modulesEmbed.setFooter("Copyright Hurricano™");
    if (!args.length) return message.channel.send(modulesEmbed);
    const argss = args.shift().toLowerCase();
    if (!avaliableModules.includes(argss)) {
      const invalidEmbed = new MessageEmbed()
        .setTitle("Invalid Arguments Provided.")
        .setDescription("Available Modules:");
      avaliableModules.forEach((d) =>
        invalidEmbed.addField(d, `\`${prefix}disable ${d}\``)
      );
      message.channel.send(invalidEmbed);
      return;
    }
    if (avaliableModules.includes(argss)) {
      let guildSchema = client.db.guilds.cache.get(message.guild.id);
      let disabledModules = guildSchema.disabledModules;
      if (disabledModules.includes(argss)) {
        message.channel.sendError(
          message,
          "Already Disabled.",
          "The module you provided is already disabled."
        );
        return;
      }
      disabledModules.push(argss);
      guildSchema.disabledModules = disabledModules;
      const data = await guildSchema.save();
      client.db.guilds.cache.set(message.guild.id, data)
      await message.channel.sendSuccess(
        message,
        "Module Enabled.",
        `The module \`${argss}\` has been disabled.`
      );
    }
  },
});
