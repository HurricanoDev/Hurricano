const database = require("../schemas/giveaway");

const { GiveawaysManager } = require("discord-giveaways");
module.exports = class Gmanager extends GiveawaysManager {
  async getAllGiveaways() {
    return await database.find({});
  }
  async refreshStorage() {
    // This should make all shard refreshing their cache with the updated database
    return global.client.shard.broadcastEval(() =>
      this.giveawaysManager.getAllGiveaways(),
    );
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
    await database.findOneAndDelete({ messageID: messageID }).exec();
    return true;
  }
};
