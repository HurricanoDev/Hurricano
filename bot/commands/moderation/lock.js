var Discord = require("discord.js");
const ms = require("ms");
  module.exports = {
      name: "lock",
      description: "Locks down a channel",
      run: async (message, args) => {
          let lockit = [];
      let channel = message.guild.channels.cache.get(args[1]) || message.mentions.channels.first() || message.guild.channels.cache.find(x => x.name == args[1]) ||message.channel;
      if (!channel) {
          message.channel.sendError("Invalid Channel Provided.", "Please provide a valid channel.")
      }
      let time = ms(args[0]);
      let validUnlocks = ['release', 'unlock'];
      var notimeembed = new Discord.MessageEmbed()
      .setTitle('Error')
      .setDescription("Please provide a valid time. \n You must set a duration for the lockdown in either hours, minutes or seconds.")  
      .setColor('36393e')
      if (!time) return message.channel.send(notimeembed);
  
      if (validUnlocks.includes(time)) {
        await channel.createOverwrite(message.guild.id, {
          SEND_MESSAGES: null
        })
          var liftedembed = new Discord.MessageEmbed()
          .setTitle('🔒 Lockdown')
          .setDescription("🔓 Lockdown lifted.")  
          .setColor('36393e')
          await channel.send(liftedembed);
          await clearTimeout(lockit[channel.id]);
          await delete lockit[channel.id];
        message.sendSuccessReply('Success.', `Successfully lifted the lock in ${channel}.`).catch(error => {
          client.logger.warn(error);
        });
      } else {
        await channel.createOverwrite(message.guild.id, {
          SEND_MESSAGES: false
        })
          var lockdownembed = new Discord.MessageEmbed()
          .setTitle("🔒 Channel Locked")
          .addField("Locked by", message.author, true)
          .addField("Locked for", ms(time, { long: true }), true)
          .setFooter(`To unlock, use '${await message.client.db.guild.getPrefix(message.guild.id)}lock unlock'`)
          .setColor("36393e");
          await channel.send(lockdownembed)
            await message.sendSuccessReply('Success.', `Successfully locked ${channel}.`, `To unlock it, use '${await message.client.db.guild.getPrefix(message.guild.id)}lock unlock ${channel.name}'`);
            lockit[channel.id] = setTimeout(async () => {
              var liftedembed = new Discord.MessageEmbed()
              .setTitle('🔒 Lockdown')
              .setDescription("🔓 Lockdown lifted.")  
              .setColor('36393e') 
              await channel.createOverwrite(message.guild.id, {
                SEND_MESSAGES: null
              })
                await channel.send(liftedembed).catch(x => client.logger.warn(x));
              delete lockit[channel.id];
            }, time);
      }
  }
};