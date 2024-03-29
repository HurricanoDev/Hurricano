const BaseEvent = require("../../structures/BaseEvent.js");

module.exports = class guildDeleteEvent extends BaseEvent {
	constructor(client) {
		super("guildDelete", {
			client: client,
			description: "Event meant disabling a guild if left.",
		});
	}
	async run(guild, client) {
		const guildSchema = guild.db.cache();
		guildSchema.isActive = false;
		await guildSchema.save();
	}
};
