const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "spamdetection",
  aliases: ["spamd", "antispam"],
  userPermissions: ["ADMINISTRATOR"],
  description: "Turn anti-spam on/off in your server.",
  async run(message, args) {
    const guildPrefix = message._usedPrefix
    const guildData = await client.db.guilds.cache.get(message.guild.id);
    const optionsEmbed = new MessageEmbed()
      .setAuthor("Anti-Spam Help", client.user.displayAvatarURL())
      .setDescription(
        `**Syntax:** \`${guildPrefix}spamdetection\`\n**Aliases:** \`spamd, antispam\``
      )
      .setColor("#606365")
      .addField("Permissions", "`ADMINISTRATOR`")
      .addField(
        "Subcommands:",
        "`on` Turn spam detection on.\n`off` Turn spam detection off."
      )
      .setFooter(
        `Type ${guildPrefix}help <command> for more info on a command.`
      );

    if (!args.length) return message.channel.send(optionsEmbed);

    switch (args[0].toLowerCase()) {
      case "on":
        if (guildData.antiSpam === "on") {
          return message.sendErrorReply(
            "Error!",
            "The `anti-spam` module is already enabled in this guild!"
          );
        }
        const updateData = await client.schemas.guild.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            antiSpam: "on",
          },
          {
            upsert: true,
          }
        );
        client.db.guilds.cache.set(message.guild.id, updateData);
        message.sendSuccessReply(
          "Done!",
          "The `anti-spam` module was `enabled` in this guild."
        );
        break;
      case "off":
        if (guildData.antiSpam === "off") {
          return message.sendErrorReply(
            "Error!",
            "The `anti-spam` module is already disabled in this guild!"
          );
        }
        const updateData2 = await client.schemas.guild.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            antiSpam: "off",
          },
          {
            upsert: true,
          }
        );
        client.db.guilds.cache.set(message.guild.id, updateData2);
        message.sendSuccessReply(
          "Done!",
          "The `anti-spam` module was `disabled` in this guild."
        );
        break;
    }
  },
});
