const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
const prefixSchema = require('../../schemas/prefix.js');
const client = require('../../handler-client/Client.js')
const mongoconnect = require('../../utilities/mongoconnect.js')
module.exports = {
name: "setprefix",
 aliases: ["sp", "setp"], 
 args: true,
 permissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
 cooldown: 20,
 description: "Set your server's custom prefix!",
 run: async (message, args) => {
      await mongoconnect().then(async (mongoose) => {
        try {
          const guildId = message.guild.id
          const prefix = args[0]

          await prefixSchema.findOneAndUpdate(
            {
              _id: guildId,
            },
            {
              _id: guildId,
              prefix,
            },
            {
              upsert: true,
            }
          )
  
          message.reply(`The prefix for this server is now ${prefix}.`)
  
          client.updateCache(guildId, prefix)
        } finally {
          mongoose.connection.close()
        }
      })
    },
  }