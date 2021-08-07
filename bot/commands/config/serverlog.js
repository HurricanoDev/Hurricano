const Command = require('@Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'serverlog',
  userPermissions: ['ADMINISTRATOR'],
  description: "Set/Remove your server's server log channel",
  aliases: ['serverlogs', 'setserverlog', 'setserverlogchannel'],
  slash: false,
  async run(message, args) {
    const prefix = message._usedPrefix;
    const guildData = client.db.guilds.cache.get(message.guild.id);
    const defaultEmbed = new MessageEmbed()
      .setTitle('Serverlog Help')
      .setColor('#606365')
      .setDescription(
        `**Syntax:** \`${prefix}serverlog\`\n**Aliases:** \`serverlogs, setserverlog, setserverlogchannel\``,
      )
      .addField('Permissions', '`ADMINISTRATOR`')
      .addField(
        'Subcommands:',
        '`set` Set a serverlog channel.\n`remove` Remove the current server log channel.',
      )
      .setFooter(`Use ${prefix}help <command> for more info on a command.`);

    if (!args.length) return message.channel.send({ embeds: [defaultEmbed] });

    switch (args[0].toLowerCase()) {
      case 'set':
        const isLogChannel = message.guild.channels.cache.get(
          guildData.serverLog,
        );
        if (guildData.serverLog && isLogChannel)
          return message.sendError(
            'Error',
            `A \`serverlog\` channel already exists in this server. Use \`${prefix}serverlog remove\` to remove the current serverlog channel!`,
          );

        const serverLogChannel =
          message.mentions.channels.first() ||
          message.guild.channels.cache.get(args[1]);

        if (
          !guildData.serverLog &&
          !serverLog.viewable &&
          !serverLog.permissionsFor(message.guild.me).has('SEND_MESSAGES')
        )
          return message.sendError(
            'Error',
            'Either that channel does not exist or I do not have permissions to send messages in that channel. Retry after fixing these problems',
          );

        const setServerLog = await client.schemas.guild.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            serverLog: serverLogChannel.id,
          },
          {
            upsert: true,
          },
        );
        message.channel.sendSuccess(
          message,
          'Done!',
          `The server log channel was set => ${serverLogChannel}`,
        );
        break;
      case 'remove':
        if (!guildData.serverLog)
          return message.sendError(
            'Error',
            `There is no channel set to remove! You could use \`${prefix}serverlog set <channel>\` to set one.`,
          );

        const removeLogChannel = await client.schemas.guild.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            serverLog: null,
          },
          {
            upsert: true,
          },
        );

        message.channel.sendSuccess(
          message,
          'Done!',
          `The serverlog channel was successfully removed! Wanna set another one? Use \`${prefix}serverlog set <channel>\` to do so.`,
        );
        break;
    }
  },
});
