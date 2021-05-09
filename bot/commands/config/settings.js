const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "settings",
  cooldown: 5,
  userPermissions: ["ADMINISTRATOR"],
  description: "View the server's configuration.",
  async run(message, args) {
    const guildInfo = await client.schemas.guild.findOne({
      id: message.guild.id,
    });
    const prefix = await client.db.guild.getPrefix(message.guild.id);
    //System Settings
    let systemChannel =
      message.guild.channels.cache.get(guildInfo.systemChannel) || "None";
    let autoRole = message.guild.roles.cache.get(guildInfo.autoRole) || "None";
    let suggestionChannel =
      message.guild.channels.cache.get(guildInfo.suggestionChannel) || "None";
    let memberLogChannel =
      message.guild.channels.cache.get(guildInfo.memberLog) || "None";
    let messageLogChannel =
      message.guild.channels.cache.get(guildInfo.messageLogs) || "None";

    const mainEmbed = new MessageEmbed()
      .setTitle("Settings")
      .setDescription(`**More information:** \`${prefix}settings [category]\``)
      .addField("System", "`4` settings")
      .addField("Logging", "`2` settings")
      .setTimestamp()
      .setColor("#6082b6")
      .setFooter(`© Hurricano ${client.version}`);

    switch (args[0].toLowerCase()) {
      case "system":
        const systemEmbed = new MessageEmbed()
          .setTitle("Settings: **`System`**")
          .setColor("#6082b6")
          .addField("Prefix", `\`${prefix}\``)
          .addField("System Channel", `${systemChannel}`)
          .addField("Auto Role", `${autoRole}`)
          .addField("Suggestion Channel", `${suggestionChannel}`)
          .setTimestamp()
          .setFooter(`Hurricano v1.0.0`);
        await message.channel.send(systemEmbed);
        break;
      case "logging":
        const loggingEmbed = new MessageEmbed()
          .setTitle("Settings: **`Logging`**")
          .setColor("#6082b6")
          .addField("Memberlog Channel", `${memberLogChannel}`)
          .addField("Messagelog Channel", `${messageLogChannel}`)
          .setTimestamp()
          .setFooter(`Hurricano v1.0.0`);
        await message.channel.send(loggingEmbed);
        break;
    }
  },
});
