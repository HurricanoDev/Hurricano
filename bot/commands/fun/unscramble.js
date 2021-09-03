const { MessageEmbed } = require("discord.js");
const Command = require("@structures/Command.js");
const fetch = require("node-fetch");

module.exports = new Command({
	name: "unscramble",
	aliases: ["guessword"],
	description: "Unscramble a random word!",
	clientPermissions: ["SEND_MESSAGES"],
	async run({ message, args }) {
		let word = await fetch(
			"https://random-word-api.herokuapp.com/word?number=1",
		);
		word = await word.json();
		word = word[0];
		const randomWord = word;
		const scrambled = client.utils.shuffle(randomWord);
		let guessLimit = 5;

		const prompt = new MessageEmbed()
			.setTitle("Unscramble Game")
			.setColor(message.guild.me.displayHexColor)
			.setDescription(
				`I have scrambled a word for you.\nThis is the scrambled version: **${scrambled}**.\nIn order to win, you need to guess the word correctly, you have 5 tries and you also have **15 seconds**!`,
			);
		let gotWrong = true;
		message.channel.send({ embeds: [prompt] }).then(async (started) => {
			let filter1 = (msg) => msg.author.id === message.author.id;
			let setSettings = message.channel.createMessageCollector({
				filter: filter1,
				time: 35000,
			});
			setSettings.on("collect", async (msg) => {
				if (msg.content.toLowerCase() === randomWord) {
					gotWrong = false;
					setSettings.stop();
					return message.channel.sendSuccess(
						message,
						"Correct!",
						"You got it right!",
					);
				}
				guessLimit = guessLimit - 1;
				if (guessLimit === 0) {
					return setSettings.stop();
				}
				message.channel.sendError(
					message,
					"Wrong!",
					`That was wrong! You have ${guessLimit} guesses left!`,
				);
			});

			setSettings.on("end", async () => {
				if (gotWrong)
					return message.channel.sendError(
						message,
						"Thanks for playing.",
						`You either took too long or you ran out of guesses. The word was **${randomWord}**`,
					);
			});
		});
	},
});
