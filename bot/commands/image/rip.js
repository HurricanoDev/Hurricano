const Discord = require("discord.js"),
	{ MessageAttachment } = require("discord.js");
const Command = require("@structures/Command.js");

module.exports = new Command({
	name: "rip",
	cooldown: 5,
	description: "Shows you someone's grave!",
	async run({ message, args }) {
		const canvacord = require("canvacord");
		let person = (await client.utils.getMember(true, { message, args }[0]))
			.user;
		let avatar = person.displayAvatarURL({
			dynamic: false,
			format: "png",
			size: 1024,
		});
		const img = await canvacord.Canvas.rip(avatar);
		const embed = new Discord.MessageEmbed()
			.setAuthor("R.I.P.", message.author.displayAvatarURL())
			.setDescription(`Rip ${person.toString()}!`)
			.attachFiles([new Discord.MessageAttachment(img, "img.png")])
			.setImage("attachment://img.png");
		message.reply({
			embeds: [embed],
			files: [new MessageAttachment(img, "img.png")],
		});
	},
});
