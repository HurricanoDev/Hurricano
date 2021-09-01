const Client = require("./Client.js"),
	{ Guild } = require("discord.js");

module.exports = class GuildDatabaseActionsManager {
	/**
	 * 
	 * @param {Object} input Provided input.
	 * @param {Client} input.client
	 * @param {String} input.guildId
	 * @param {Guild} input.guild 
	 */

	constructor({ client, guildId, guild }) {

		this.client = client;

		this.guildId = guildId;

		this.guild = guild;
	}
	async fetch() {
		return await this.client.db.fetch({ id: this.id });
	}
	cache() {
		return this.client.db.guilds.cache.get(this.id);
	}
};	