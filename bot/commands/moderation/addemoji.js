const Command = require('@Command');
const { Util, MessageEmbed } = require('discord.js');
const { parse } = require('twemoji-parser');
module.exports = new Command({
  name: 'addemoji',
  description:
    'lets the user add a custom emoji through an image URL. (which should be less than 256 KB)',
  userPermissions: ['MANAGE_EMOJIS'],
  async run(message, args) {
    const emoji = args[0];
    const name = args.slice(1).join(' ');
    if (!emoji) {
      return message.channel.sendError(
        message,
        'Error.',
        `Please give me an emoji!`,
      );
    }
    if (!name) {
      return message.channel.sendError(
        message,
        'Error.',
        `No emoji name specified`,
      );
    }
    try {
      if (emoji.startsWith('https://cdn.discordapp.com')) {
        const fb = await message.guild.emojis.create(emoji, name || name);

        return message.channel.sendSuccess(
          message,
          'Emoji added.',
          fb + ` has been added as "${name}"`,
        );
      }

      const customEmoji = Util.parseEmoji(emoji);

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? 'gif' : 'png'
        }`;

        const emj = await message.guild.emojis.create(
          `${link}`,
          `${name || `${customEmoji.name}`}`,
        );
        return message.channel.sendSuccess(
          message,
          'Done!',
          `${emj} has been added as ${name}`,
        );
      } else {
        const foundEmoji = parse(emoji, { assetType: 'png' });
        if (!foundEmoji[1]) {
          return message.channel.sendError(
            message,
            'Error.',
            "Please provide a valid emoji. I can't work with this and it should be under 256 KB",
          );
        }

        message.channel.sendError(
          message,
          'Error!',
          'Bruv this is a normal emoji what you can use anywhere',
        );
      }
    } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Maximum number of emojis reached (50). I can't work with this and it should be under 256 KB",
        )
      ) {
        return message.channel.sendError(
          message,
          'Error.',
          'Maximum emoji count reached for this Server!',
        );
      }
    }
  },
});
