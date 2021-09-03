const Command = require("@structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
	name: "suggest",
	description: "Suggest something to this server.",
	args: "Please provide what you would like to suggest!",
	async run({ message, args }) {
		let guildSchema = client.db.guilds.cache.get(message.guild.id);
		const prefix = message._usedPrefix;
		let channel =
			guildSchema.suggestionChannel &&
			!isNaN(guildSchema.suggestionChannel)
				? await client.channels.fetch(guildSchema.suggestionChannel)
				: undefined;
		if (!channel)
			return message.sendErrorReply(
				"An Error Occured.",
				`This server does not have any suggestion channel! Ask an admin to set it up via: \n\`${prefix}suggestionchannel set {channel name}\``,
			);
		const suggestionsObj = guildSchema.suggestions;
		let idea = args.join(" ");
		const embed = new MessageEmbed()
			.setAuthor(
				`Suggestion from: ${message.author.tag} (${message.author.id})`,
				message.author.displayAvatarURL(),
			)
			.setTitle(`Suggestion ID: \`${guildSchema.suggestionNumber}\``)
			.setDescription(idea)
			.setTimestamp();
		const suggestionSent = await channel.send({ embeds: [embed] });
		suggestionsObj[guildSchema.suggestionNumber] = [
			suggestionSent.id,
			message.author.id,
			idea,
		];
		let suggestionNumber = guildSchema.suggestionNumber - 0 + 1;
		const data = await client.schemas.guild.findOneAndUpdate(
			{
				id: message.guild.id,
			},
			{
				suggestionNumber: suggestionNumber,
				suggestions: suggestionsObj,
			},
		);
		client.db.guilds.cache.set(message.guild.id, data);
		await message.channel.sendSuccess(
			message,
			"Success!",
			`Successfully sent a suggestion! You can check it [here](${suggestionSent.url}).`,
		);
	},
});
