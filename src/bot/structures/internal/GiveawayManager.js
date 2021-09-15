import database from "@schemas/giveaway.js";
import discordGiveaways from "discord-giveaways";
const { GiveawaysManager: BaseGiveawayManager } = discordGiveaways;
export default (class GiveawayManager extends BaseGiveawayManager {
    constructor({ client, ManagerOptions, initOnStart }) {
        super(client, ManagerOptions, initOnStart);
        /**
         * Hurricano's client.
         * @type {}
         */
        this.client = client;
    }
    async getAllGiveaways() {
        return await database.find({});
    }
    async refreshStorage() {
        return this.client.shard.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
    }
    async saveGiveaway(messageID, giveawayData) {
        messageID;
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
});
