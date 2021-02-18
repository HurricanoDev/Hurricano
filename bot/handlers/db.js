require('module-alias/register');
const mongoose = require('mongoose');
const client = require('@root/index.js');
const mongoPath = require('@config').mongouri;

module.exports = {
    init: function (){
        mongoose.connect(mongoPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
          })
          mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB!");
          });
          
          mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from MongoDB!");
          });
    },
    //Guild functions
    guild: {
        getInfo: async (guildID) => {
            const data = await client.schemas.guild.findOne({ id: guildID })
            return data;
        },
        getPrefix: async (guildID) => {
            const data = await client.schemas.guild.findOne({ id: guildID })
            return data.prefix;
        },

        //Updates
        updatePrefix: async (guildID, newPrefix) => {
            return await client.schemas.guild.findOneAndUpdate({ id: guildID }, { prefix: newPrefix })
        }
    }
}