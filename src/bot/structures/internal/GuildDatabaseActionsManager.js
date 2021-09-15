export default (class GuildDatabaseActionsManager {
    /**
     * Initializes the class.
     * @param {Object} input Provided input.
     * @param {Client} input.client
     * @param {String} input.guildId
     * @param {Guild} input.guild
     */
    constructor({ client, id, guildId, guild }) {
        id ??= guildId;
        this.client = client;
        this.guild = guild;
        this.client.utils.defineIds("guild", id, this);
    }
    async fetch() {
        return await this.client.db.guilds.fetch(this.id);
    }
    cache() {
        return this.client.db.guilds.cache.get(this.id);
    }
});
