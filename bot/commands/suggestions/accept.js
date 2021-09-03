const { MessageEmbed } = require("discord.js"),
	Suggestions = require("Utils/Suggestions.js");

const Command = require("@structures/Command.js");
module.exports = new Command({
	name: "accept",
	userPermissions: ["ADMINISTRATOR"],
	args: "Please provide which suggestion you would like to approve!",
	cooldown: 20,
	description: "Approve a suggestion!",
	async run(message, args) {
		const suggestionChannel = await Suggestions.fetchSuggestionChannel(
			message.guild.id,
		);
		if (!suggestionChannel)
			return message.channel.sendError(
				message,
				"No Suggestions Channel!",
				"This guild does not have a suggestions channel set! Ask an administrator to set it up.",
			);
		const guildSchema = client.db.guilds.cache.get(message.guild.id);
		let suggestions = guildSchema.suggestions;
		let suggestion = suggestions[args[0]];
		if (!suggestion)
			return message.channel.sendError(
				message,
				"Invalid Suggestion ID!",
				"Please provide a valid suggestion ID!",
			);
		let suggestionMsg = await suggestionChannel.messages.fetch(
			suggestion[0],
		);
		let suggestionUser = client.users.cache.get(suggestion[1]);
		let embed = new MessageEmbed()
			.setAuthor("Suggestion Accepted!", client.links.successImage)
			.setDescription("Accepted idea! Will be implemented soon!")
			.addField(
				`Suggestion from \`${suggestionUser.tag}\`:`,
				suggestion[2].length > 1024
					? "Suggestion content is larger than 1024."
					: suggestion[2],
				true,
			)
			.addField(
				"Approved By:",
				message.author.tag + ` (${message.author.id})`,
			);
		await suggestionMsg.edit({ embeds: [embed] });

		await message.channel.sendSuccess(
			message,
			"Success!",
			`Successfully approved [this suggestion!](${suggestionMsg.url})`,
		);
	},
});
