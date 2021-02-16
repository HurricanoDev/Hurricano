const mongoose = require('mongoose');
const mongoconnect = require('../utilities/mongoconnect.js');
const client = require('../handler-client/Client.js');
const config = require('../../config.json');
module.exports = async (client) => { //ready event
    client.prefixes = new Map();
    await mongoconnect().then(async (mongoose) => {
      try {
        for (const guild of client.guilds.cache.values()) {  
          const prefixSchema = require('../utilities/schema.js');
          const result = await prefixSchema.prefixes.findOne({ _id: guild.id })
          const prefix =  result ? result.prefix : config.prefix
           client.prefixes.set(guild.id, prefix)
           const guildId = guild.id;
        }}
       finally {
        mongoose.connection.close()
      }
    })
  
   client.connectmongo()
   client.user.setActivity({ name:`${config.prefix}help`, type: 'STREAMING', url: 'https://twitch.tv/Pewdiepie'});
   console.log(`${client.user.username} Successfully Logged in!`);
  }
  
