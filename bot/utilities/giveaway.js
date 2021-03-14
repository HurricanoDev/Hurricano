const database = require('../schemas/giveaway');

  const { GiveawaysManager } = require('discord-giveaways');
module.exports = class Gmanager extends GiveawaysManager {
      async getAllGiveaways() {
          return await database.find({});
      }
      async saveGiveaway(messageID, giveawayData) {
          await database.create(giveawayData);
          return true;
      }
      async editGiveaway(messageID, giveawayData) {
          await database
              .findOneAndUpdate({ messageID: messageID }, giveawayData)
              .exec();
          return true;
      }
      async deleteGiveaway(messageID) {
          await database
              .findOneAndDelete({ messageID: messageID })
              .exec();
          return true;
   }
}
