const { MessageEmbed } = require("discord.js");
const Command = require("@Command");

module.exports = new Command({
	name: "lyrics",
	aliases: ["ly"],
	description: "Get a song's lyrics!",
	async run(message, args) {
		const queue = client.player.getQueue(message.guild.id);
		let query = queue?.nowPlaying()?.title;
		if (!queue) query = args.join(" ");
		if (!query) return message.channel.sendError(message, "Invalid Query.", "Please provide what song you would like to see the lyrics of.");
		const lyrics = await client.lyricsClient.search(query);
		if (!lyrics)
			return message.channel.sendError(
				message,
				"Oops!",
				`Oops! Hurricano couldn't find the lyrics for this song. Perhaps try searching for the song yourself, via \`${message._usedPrefix}lyrics {song name}\``,
			);
		function sendLyrics(desc, pageNumber, pageLength) {
			const embed = new MessageEmbed()
				.setAuthor(
					`Lyrics For: ${lyrics.title}, by ${lyrics.artist.name}`,
					"https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif",
				)
				.setThumbnail(lyrics.thumbnail)
				.setDescription(desc)

				.setFooter(`${message.member.displayName} | ${pageNumber + 1}/${pageLength}`, message.author.displayAvatarURL());
			message.channel.send({ embeds: [embed] });
		}
		const lyricWords = lyrics.lyrics.match(/[\s\S]{1,2000}/g);

		for (let x = 0; x < lyricWords.length; x++) {
			sendLyrics(lyricWords[x], x, lyricWords.length);
		}
	},
});
