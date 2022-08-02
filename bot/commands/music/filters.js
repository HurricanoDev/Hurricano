const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
	name: "filters",
	aliases: ["filter"],
	args: `Please provide which filter you would like to use!`,
	async run(message, args) {
		if (!message.member.voice.channel)
			return message.channel.sendError(message, "Not in A Voice Channel.", "Please join a voice channel to play music.");
		const queue = client.player.getQueue(message.guild.id);
		if (!queue) return message.channel.sendError(message, "No Music is Playing.", "Please play some music to play filters.");

		const filterToUpdate = message.client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

		if (!filterToUpdate)
			return message.channel.sendError(
				message,
				"Invalid Filter",
				`This filter doesn't exist. Filters you can use are: \n ${client.filters.map((x) => `\`${x}\``).join(", ")}`,
			);

		const filtersUpdated = {};

		filtersUpdated[filterToUpdate] = queue.filters[filterToUpdate] ? false : true;

		queue.setFilters(filtersUpdated);
		if (filtersUpdated[filterToUpdate])
			await message.channel.sendSuccess(
				message,
				"Filter Being Added.",
				"I am adding the filter the the song. Please wait. The longer the song is, the longer it takes.",
			);
		else
			await message.channel.sendSuccess(
				message,
				"Filter Being Removed.",
				"I am removing the filters. Please wait. The longer the song is, the longer this will take.",
			);
	},
});
