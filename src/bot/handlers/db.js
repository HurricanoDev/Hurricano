import mongoose from "mongoose";
import { Collection } from "discord.js";
class HurricanoDatabase {
    client;
    mongoPath;
    users;
    guilds;
    constructor(client, mongoPath) {
        this.constructor.validateCredentials(client, mongoPath);
        this.client = client;
        this.mongoPath = mongoPath;
        this.users = {
            cache: new Collection(),
            fetch: async (userId) => {
                const user = await this.client.users.fetch(userId);
                if (!user || typeof userId !== "string")
                    return null;
                let data = await this.client.schemas.user.findOne({
                    id: userId,
                });
                if (!data)
                    data = await new client.schemas.user({
                        id: user.id,
                        name: user.username,
                    }).save();
                this.users.cache.set(userId, data);
                return data;
            },
        };
        this.guilds = {
            cache: new Collection(),
            fetch: async (guildId) => {
                const guild = this.client.guilds.cache.get(guildId);
                if (!guild || typeof guildId !== "string")
                    return null;
                const data = await this.client.schemas.guild.findOne({
                    id: guildId,
                });
                this.guilds.cache.set(guildId, data);
                return data;
            },
            updateCache: async (guildId) => {
                const data = await this.client.schemas.guilds.findOne({
                    id: guildId,
                });
                this.guilds.cache.set(guildId, data);
            },
            updatePrefix: async (guildId, newPrefix) => {
                return await this.client.schemas.guild.findOneAndUpdate({ id: guildId }, { prefix: newPrefix });
            },
        };
    }
    static validateCredentials(client, mongoPath) {
        if (!client)
            throw new Error(".No Client found.");
        if (typeof client !== "object")
            throw new Error("Client is not an object.");
        if (!mongoPath)
            throw new Error("No MongoDB uri provided.");
        if (typeof mongoPath !== "string")
            throw new Error("MongoDB provided is not a string.");
    }
    init() {
        mongoose.connect(encodeURIComponent(this.mongoPath), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        mongoose.connection.on("connected", () => {
            client.logger.db("Connected to MongoDB!");
        });
        mongoose.connection.on("disconnected", () => {
            client.logger.db("Disconnected from MongoDB!");
        });
    }
}
export default HurricanoDatabase;
