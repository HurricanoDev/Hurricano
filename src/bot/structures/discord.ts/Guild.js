const GuildDatabaseActionsManager = require("../internal/GuildDatabaseActionsManager.js");

module.exports = {
	name: "Guild",
	extend({ Guild }) {
		return class HurricanoGuild extends Guild {
			constructor(...args) {
				super(...args);

				this.db = new GuildDatabaseActionsManager({
					client,
					guildId: this.id,
					guild: this,
				});
			}
		};
	},
};
