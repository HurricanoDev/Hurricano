const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
	name: "search",
	description: "Search for a song!",
	args: "Please provide what you would like to search!",
	cooldown: 15,
	async run(message, args) {
		if (!message.member.voice.channel)
			return message.channel.sendError(message, "Not in A Voice Channel.", "Please join a voice channel to play music.");
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
			return message.channel.sendError(message, "Different Voice Channel.", "Please join the same voice channel as me.");
		const tracks = (
			await client.player.search(args.join(" "), {
				requestedBy: message.author,
			})
		).tracks;

		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setAuthor(
						`Search Results for ${args.join(" ")}.`,
						"https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png",
					)
					.setDescription(`${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join("\n")}`)
					.setTimestamp()
					.setFooter("Type the number you want to play, or type cancel to cancel."),
			],
		});
		let track;
		const collector = message.channel.createMessageCollector({
			filter: (x) => x.author.id === message.author.id,
		});

		collector.on("collect", (msg) => {
			if (msg.author.id !== message.author.id) return;
			if (["cancel", "stop", "end", "exit"].includes(msg.content.toLowerCase())) {
				collector.stop();
				return message.channel.sendSuccess(message, "Success.", "Successfully ended the search.");
			}
			if (!+msg.content) return message.channel.sendError(message, "Invalid Arguments.", "Please provide a valid number.");
			if (+msg.content <= 0) return message.channel.sendError(message, "Invalid Number Provided.", "Please provide a positive number.");
			if (+msg.content > tracks.length)
				return message.channel.sendError(
					message,
					"Invalid Number Provided.",
					`The number you provided is larger than the number tracks the search returned (${tracks.length + 1}).`,
				);
			track = tracks[+msg.content - 1];
			collector.stop();
		});
		collector.on("end", async () => {
			if (!track) return;
			const queue = client.player.createQueue(message.guild, {
				metadata: message,
			});
			if (!queue.connection) await queue.connect(message.member.voice.channel);
			queue.play(track);
		});
	},
});
