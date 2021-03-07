require('module-alias/register');
const mongoose = require('mongoose');
const mongoPath = require('@config').mongouri;

module.exports = {
    init: function (){
        mongoose.connect(mongoPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
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
            const data = await global.client.schemas.guild.findOne({ id: guildID })
            return data;
        },
        getPrefix: async (guildID) => {
            const data = await global.client.schemas.guild.findOne({ id: guildID })
            return data.prefix;
        },

        //Updates
        updatePrefix: async (guildID, newPrefix) => {
            return await global.client.schemas.guild.findOneAndUpdate({ id: guildID }, { prefix: newPrefix })
        }
    }
}