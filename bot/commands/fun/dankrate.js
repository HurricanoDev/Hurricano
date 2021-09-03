const { MessageEmbed } = require("discord.js");
const Command = require("@structures/Command.js");
module.exports = new Command({
	name: "dankrate",
	aliases: ["dankr8", "howdank"],
	description: "How dank are you? Find out now.",
	clientPermissions: ["SEND_MESSAGES"],
	async run(message, args) {
		let member = message.mentions.users.first() || message.author;

		let rng = Math.floor(Math.random() * 101);

		const dankratembed = new MessageEmbed()
			.setTitle(`dank r8 machine`)
			.setDescription(`${member.username} is ` + rng + "% dank")
			.setColor("RED");

		message.channel.send({
			embeds: [dankratembed],
		});
	},
});
