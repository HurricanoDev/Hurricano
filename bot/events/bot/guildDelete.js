const BaseEvent = require("../../structures/internal/BaseEvent.js");

module.exports = class guildDeleteEvent extends BaseEvent {
	constructor(client) {
		super("guildDelete", {
			client,
			description: "Event meant disabling a guild if left.",
		});
	}
	async run(guild) {
		const guildSchema = guild.db.cache();
		guildSchema.isActive = false;
		await guildSchema.save();
	}
};
