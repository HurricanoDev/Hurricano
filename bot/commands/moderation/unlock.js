const Command = require("@structures/Command.js");
const Discord = require("discord.js");
module.exports = new Command({
	name: "unlock",
	description: "Unlocks a channel.",
	userPermissions: ["MANAGE_CHANNELS"],
	async run(message, args) {
		let channel =
			message.guild.channels.cache.get(args[0]) ||
			message.mentions.channels.first() ||
			message.guild.channels.cache.find((x) => x.name == args[0]) ||
			message.channel;

		if (!channel) {
			message.channel.sendError(
				"Invalid Channel Provided.",
				"Please provide a valid channel.",
			);
		}
		await channel.createOverwrite(message.guild.id, {
			SEND_MESSAGES: null,
		});
		var liftedembed = new Discord.MessageEmbed()
			.setTitle("🔒 Lockdown")
			.setDescription("🔓 Lockdown lifted.")
			.setColor("36393e");
		await channel.send({ embeds: [liftedembed] });
	},
});
