const Discord = require("discord.js"),
	{ MessageAttachment } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
	name: "facepalm",
	cooldown: 5,
	description: "Make your own facepalm image with your/mentions avatar.",
	async run(message, args) {
		const canvacord = require("canvacord");
		let person = (await client.utils.getMember(true, message, args[0]))
			.user;
		let avatar = person.displayAvatarURL({
			dynamic: false,
			format: "png",
			size: 1024,
		});
		let avatar2 = message.author.displayAvatarURL({
			dynamic: false,
			format: "png",
		});
		let image = await canvacord.Canvas.facepalm(avatar);
		return message.reply({
			embeds: [new Discord.MessageEmbed()],
			files: [new MessageAttachment(img, "img.png")],
		});
	},
});
