const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
	name: "stop",
	aliases: ["dc"],
	async run(message) {
		if (!message.member.voice.channel)
			return message.channel.sendError(message, "Not in A Voice Channel.", "Please join a voice channel to play music.");

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.sendError(message, "Different Voice Channel.", "Please join the same voice channel as me.");
		const queue = client.player.getQueue(message.guild);
		if (!queue) return message.channel.sendError(message, "No Music is Playing.", "Please join a voice channel to play music.");

		queue.setRepeatMode(false);
		const success = queue.stop();

		if (success) await message.channel.sendSuccess(message, "Stopped.", "I have successfully stopped the music.");
	},
});
