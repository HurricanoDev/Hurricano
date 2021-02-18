const mongoose = require('mongoose')
const client = global.client
const mongoPath = client.config.mongouri;

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
        }
    }
}