const Discord = require("discord.js");
const Command = require("@structures/Command.js");
module.exports = new Command({
	name: "connect4",
	aliases: ["c4", "connectfour"],
	description: "Play the connect four game!",
	clientPermissions: ["SEND_MESSAGES"],
	args: "Please provide who you would like to play connect4 against!",
	async run({ message, args }) {
		let user = (await client.utils.getMember(false, { message, args }[0])).user;
		if (!user)
			return message.channel.sendError(
				message,
				"Invalid User!",
				"Please provide a valid user!",
			);
		if (user.id === message.author)
			return message.channel.sendError(
				message,
				"Invalid User!",
				"You can't play connect4 with yourself!",
			);
		if (user.bot)
			return message.channel.sendError(message, "Invalid User!", "You ");
		const Connect4 = require("../../utilities/game-apis/four.js");
		const connect4 = new Connect4(message, message.author, user);
		connect4.newGame();
	},
});
