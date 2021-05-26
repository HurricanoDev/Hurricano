const mongoose = require("mongoose");
const { Collection } = require('discord.js');
class HurricanoDatabase {
  constructor(client, mongoPath) {
    this.constructor.validateCredentials(client, mongoPath), (this.client = client);
    this.client = client;
    this.mongoPath = mongoPath;
    this.guilds = {
      cache: new Collection(),
      fetch: async (guildId) => {
      const guild = this.client.guilds.cache.get(guildId);
      if (!guild) return null;
      const data = await this.client.schemas.guild.findOne({ id: guildId });
      this.db.guilds.cache.set(guildId, data);
    },
        getInfo: async (guildID) => {
      const data = await global.client.schemas.guild.findOne({ id: guildID });
      return data;
    },
    getPrefix: async (guildID) => {
      const data = await global.client.schemas.guild.findOne({ id: guildID });
      if (!data) throw new Error(`Guild data not found.`);
      return data.prefix;
    },
    
    //Updates
    updatePrefix: async (guildID, newPrefix) => {
      return await global.client.schemas.guild.findOneAndUpdate(
        { id: guildID },
        { prefix: newPrefix }
      );
    },
    }
  }
  static validateCredentials(client, mongoPath) {
    if (!client) throw new Error('.No Client found.');
    if (typeof client !== 'object') throw new Error('Client is not an object.');
    if (!mongoPath) throw new Error('No MongoDB uri provided.');
    if (typeof mongoPath !== 'string') throw new Error('MongoDB provided is not a string.');
  }
  init() {
    mongoose.connect(this.mongoPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    mongoose.connection.on("connected", () => {
      client.logger.db("Connected to MongoDB!");
    });

    mongoose.connection.on("disconnected", () => {
      client.logger.db("Disconnected from MongoDB!");
    });
  }
};
module.exports = HurricanoDatabase;