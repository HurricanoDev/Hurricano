const { MessageEmbed } = require('discord.js');
const Command = require('@Command');
module.exports = new Command({
  name: 'msglogs',
  aliases: ['messagelogs', 'messagelog'],
  userPermissions: ['ADMINISTRATOR'],
  cooldown: 20,
  description: "Set your server's message logs.",
  async run(message, args) {
    const prefix = message._usedPrefix;
    if (!args.length)
      return message.channel.sendError(
        message,
        'Invalid Arguments Provided!',
        `Please provide whether you would like to set the logs channel, or remove it! \n Examples: \n \`${prefix}msglogs set #logs\` \n \`${prefix}msglogs remove\``,
      );

    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[1]) ||
      message.guild.channels.cache.find((chan) => chan.name.includes(args[0]));
    if (!channel)
      return message.sendErrorReply(
        'Invalid Channel Provided!',
        'Invalid channel provided! Please provide a channel you would like to set logs to.',
      );
    var guildSchema = client.schemas.guild;
    let guildLog = client.db.guilds.cache.get(message.guild.id);
    switch (args[0]) {
      case 'set':
        if (guildLog.messageLogs)
          return message.sendErrorReply(
            'Logs already set!',
            `The channel you provided already has logs set! If you would like to remove logs from that channel, send: \n \`${prefix}msglogs remove\``,
          );
        let data = await guildSchema.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            messageLogs: channel.id,
          },
          {
            upsert: true,
          },
        );
        message.sendSuccessReply(
          'Success!',
          `I have successfully set the message logs to ${channel}!`,
        );
        break;
      case 'remove':
        if (guildLog.messageLogs)
          return message.sendErrorReply(
            'Already Disabled!',
            `The logs are already disabled. You can enable them via: \n \`${prefix}msglogs set {channel name}\``,
          );
        data = await guildSchema.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            messageLogs: null,
          },
          {
            upsert: true,
          },
        );
        message.sendSuccessReply(
          'Success!',
          'I have successfully disabled message logs.',
        );
    }
  },
});
