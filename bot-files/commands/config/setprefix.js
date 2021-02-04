const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
const prefixSchema = require('../../schemas/prefix.js');
const client = require('../../handler-client/Client.js')
const mongoconnect = require('../../utilities/mongoconnect.js')
module.exports = {
name: "setprefix",
 aliases: ["sp", "setp"], 
 description: "Set your server's custom prefix!",
 run: async (message, args) => {
      await mongoconnect().then(async (mongoose) => {
        try {
          const guildId = message.guild.id
          const prefix = args[0]
  console.log(message.guild.id)
          if (!message.member.hasPermission("ADMINISTRATOR")) {
              message.channel.send({ embed: {
                  title: "An Error Occured.",
                  description: "You need to have the permission `ADMINISTRATOR` to do this.",
                  footer: {text: "Imagine trying to run an admin command without having the permissions-"}
              }})
          }
          if (args.length === 0) {
            message.channel.send(new MessageEmbed.setTitle('An Error Occured.').setDescription(':/ What do you expect me to change the prefix to huh? \n Provide the prefix you would like to change to.').addField('Example', '`dn!setprefix ?`').setFooter('Smh life just gets tougher and tougher everyday-'))
          }
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