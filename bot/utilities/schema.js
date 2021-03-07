const config = require('../../config.json');
const mongoose = require('mongoose'); 
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
      console.log('[Giveaways] Giveaway DB connected to MongoDB!');
  });
  
  const giveawaySchema = require('../schemas/giveaway')
  
 module.exports = async () => {
     const database = mongoose.model('database', giveawaySchema)
       
  const { GiveawaysManager } = require('discord-giveaways');
  class Gmanager extends GiveawaysManager {
      async getAllGiveaways() {
          return await database.giveaways.find({});
      }
      async saveGiveaway(messageID, giveawayData) {
          await database.giveaways.create(giveawayData);
          return true;
      }
      async editGiveaway(messageID, giveawayData) {
          await database.giveaways
              .findOneAndUpdate({ messageID: messageID }, giveawayData)
              .exec();
          return true;
      }
      async deleteGiveaway(messageID) {
          await database.giveaways
              .findOneAndDelete({ messageID: messageID })
              .exec();
          return true;
      }
  }
  const manager = new Gmanager(global.client, {
      updateCountdownEvery: 6969,
      default: {
          botsCanWin: false,
          exemptPermissions: ['ADMINISTRATOR'],
          embedColor: '#034ea2',
          reaction: '🎉'
      }
  });

  /**
   * @type {Object}
   */
  global.giveawaysManager = manager;
 }
