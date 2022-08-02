const { MessageAttachment, MessageEmbed } = require("discord.js"),
	Command = require("@Command");

module.exports = new Command({
	name: "achievement",
	cooldown: 5,
	description: "gives the user a minecraft achievement according to text provided by the user.",
	usage: "achievement <text>",
	async run(message, args) {
		const sentence = args.join("+");
		if (!sentence) return message.channel.send("Please specify a text.");
		if (sentence > 22) return message.channel.send("Please type a text no bigger than 22 characters");
		let embed = new MessageEmbed()
			.setTitle("Achievement unlocked!")
			.setImage(`https://api.cool-img-api.ml/achievement?text=${sentence}`)
			.setColor("RANDOM")
			.setFooter(" ");
		message.channel.send({ embeds: [embed] });
	},
});
