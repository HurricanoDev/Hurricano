const Discord = require("discord.js");
const Command = require("@Command");
const fetch = require("node-fetch");
module.exports = new Command({
	name: "catfact",
	userPermissions: ["SEND_MESSAGES"],
	cooldown: 20,
	description: "gives a random catfact.",
	async run(message, args) {
		const req = await fetch("https://catfact.ninja/fact");
		const data = await req.json();
		const embed = new discord.MessageEmbed()
			.setTitle("😺 A random cat fact 🐈")
			.setColor("0x00ff00")
			.setDescription(data["fact"]);

		await message.reply({ embeds: [embed] });
	},
});
