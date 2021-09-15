import { Collection } from "discord.js";
export default (class DatabaseUserManager {
    constructor({ client }) {
        this.client = client;
        this.cache = new Collection();
    }
    async populate() {
        const users = await this.client.schemas.users.find({});
        for (const user of users)
            this.cache.set(user.id, user);
    }
    async fetch() { }
});
