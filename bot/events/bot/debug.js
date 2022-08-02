const BaseEvent = require("../../structures/BaseEvent.js");

module.exports = class DebugEvent extends BaseEvent {
	constructor(client) {
		super("debug", {
			description: "The debug event, to log extra info.",
			client: client,
		});
	}
	run(info) {
		if (!info.toLowerCase().includes("voice")) return client.logger.info(info);
	}
};
