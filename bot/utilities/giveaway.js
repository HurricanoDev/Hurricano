const database = require("../schemas/giveaway");

const { GiveawaysManager } = require("discord-giveaways");
module.exports = class Gmanager extends GiveawaysManager {
    async refreshStorage() {
        return client.shard.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
    }
    async getAllGiveaways() {
        return await database.find().lean().exec();
    }
    async saveGiveaway(messageId, giveawayData) {
        await database.create(giveawayData);
        return true;
    }
    async editGiveaway(messageId, giveawayData) {
        await database.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
        return true;
    }
    async deleteGiveaway(messageId) {
        await database.deleteOne({ messageId }).exec();
        return true;
    }
};
