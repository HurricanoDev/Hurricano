const Discord = require("discord.js"),
	{ MessageAttachment } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
	name: "beautify",
	cooldown: 5,
	description: "Make you more beautiful :D",
	async run(message, args) {
		const canvacord = require("canvacord");
		let person = (await client.functions.getMember(true, message, args[0])).user;
		let avatar = person.displayAvatarURL({
			dynamic: false,
			format: "png",
			size: 1024,
		});
		const img = await canvacord.Canvas.beautiful(avatar);
		const embed = new Discord.MessageEmbed()
			.setAuthor("What an art work.", message.author.displayAvatarURL())
			.setDescription(`How amazing this art is.`)
			.setImage("attachment://img.png");
		message.reply({
			embeds: [embed],
			files: [new MessageAttachment(img, "img.png")],
		});
	},
});
