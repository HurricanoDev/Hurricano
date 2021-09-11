const Discord = require("discord.js");
const Command = require("@structures/Command.js");
const Hangman = require("../../utilities/game-apis/hangman.js");

module.exports = new Command({
	name: "hangman",
	aliases: ["hangm"],
	description: "Play hangman!",
	clientPermissions: ["SEND_MESSAGES"],
	async run({ message, args }) {
		const hangman = new Hangman(message);

		hangman.newGame(message);
	},
});
