const Command = require("@Command");
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: "systemmessage",
  description: "Send a message to all servers with a system channel.",
  args: "Give me a message to send to the servers with a system channel.",
  ownerOnly: true,
  async run(client, message, args) {
    const Schema = client.schemas.guild;
    const msg = args.join(" ");
    const guilds = []
    client.guilds.cache.forEach(guild => {
      const data = await Schema.findOne({ id: guild.id });
      const systemChannel = guild.channels.cache.get(data.systemChannel);
      if (
        systemChannel && 
        systemChannel.viewable &&
        systemChannel.permissionsFor(guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
      ) {
        const embed = new MessageEmbed()
          .setTitle('Hurricano System Message')
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(msg)
          .setTimestamp()
          .setColor("#6082b6");
        systemChannel.send(embed);
      } else guilds.push(guild.name);
    });
    if (guilds.length > 0) {
      const description = client.utils.trimStringFromArray(guilds);

      const embed = new MessageEmbed()
        .setTitle('System Message Failures')
        .setDescription(description)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("#6082b6");
      message.channel.send(embed);
    }
  }
}) 
