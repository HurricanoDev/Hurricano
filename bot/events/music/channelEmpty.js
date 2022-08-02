module.exports = {
	name: "channelEmpty",
	run: async (queue) => {
		const message = queue.metadata;
		message.channel.sendError(message, "Music Playback Stopped.", `Music playback has been seized as there is no one in the voice channel.`);
	},
};
