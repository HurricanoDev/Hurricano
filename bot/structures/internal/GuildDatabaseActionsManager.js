// eslint-disable-next-line
const Client = require("./Client.js"),
// eslint-disable-next-line
	{ Guild } = require("discord.js");

module.exports = class GuildDatabaseActionsManager {
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

		this.guildId = id;

		this.id = id;

		this.guild = guild;
	}
	async fetch() {
		return await this.client.db.guilds.fetch(this.id);
	}
	cache() {
		return this.client.db.guilds.cache.get(this.id);
	}
};	