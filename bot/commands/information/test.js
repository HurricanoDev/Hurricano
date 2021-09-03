const Discord = require("discord.js");
const Command = require("@structures/Command.js");

module.exports = new Command({
	name: "test",
	description:
		"Test if the bot's slash commands are working, and make it say something.",
	slash: {
		name: "test",
		isSlash: true,
		options: [
			{
				name: "text",
				description: "What you want the bot to say.",
				type: 3,
				required: true,
			},
		],
		async run(message, args) {
			await message.reply(args[0].value, { ephemeral: true });
		},
	},
});
