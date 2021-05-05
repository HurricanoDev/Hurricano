const Command = require("@Command");
const { MessageEmbed } = require('discord.js');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = new Command({
  name: "leaveguild",
  description: "Force Hurricano to leave a server.",
  args: "Give me a ID of a server to leave.",
  async run (message, args) {
    const guildId = args[0];
    if (!rgx.test(guildId))
      return this.sendErrorMessage(message, 0, 'Please provide a valid server ID');
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild) return message.channel.sendErrorReply(message, "Error", 'Unable to find server, please check the provided ID');
    await guild.leave();
    const embed = new MessageEmbed()
      .setTitle('Leave Guild')
      .setDescription(`I have successfully left **${guild.name}**.`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#6082b6");
    message.channel.send(embed);
  }
})
