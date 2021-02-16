const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
const client = require('../../handler-client/Client.js');
const emojis = require('../../utilities/emojis.json');
module.exports = {
name: "setprefix",
 aliases: ["sp", "setp"], 
 args: true,
 permissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
 cooldown: 20,
 description: "Set your server's custom prefix!",
 run: async (message, args) => {
          const guildId = message.guild.id
          const prefix = args[0]
client.prefixes.set(guildId, prefix);
message.reply(new MessageEmbed().setTitle(`${emojis.fail} Server Settings Change.`).setDescription(`The prefix is now \`${client.prefixes.get(guildId)}\`.`))
    },
  }