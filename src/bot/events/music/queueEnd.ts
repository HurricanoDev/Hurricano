module.exports = {
	name: "queueEnd",
	run: async (queue) => {
		const message = queue.metadata;
		if (!message.member.voice.channel.members.size) return;
		message.channel.sendError(
			message,
			"Music Ended.",
			`There are no more songs in the queue.`,
		);
	},
};
