const Command = require("@structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
	name: "settings",
	cooldown: 5,
	userPermissions: ["ADMINISTRATOR"],
	description: "View the server's configuration.",
	async run(message, args) {
		const guildInfo = client.db.guilds.cache.get(message.guild.id);
		const prefix = message._usedPrefix;
		//System Settings
		let systemChannel =
			message.guild.channels.cache.get(guildInfo.systemChannel) || "None";
		let autoRole =
			message.guild.roles.cache.get(guildInfo.autoRole) || "None";
		let suggestionChannel =
			message.guild.channels.cache.get(guildInfo.suggestionChannel) ||
			"None";
		let memberLogChannel =
			message.guild.channels.cache.get(guildInfo.memberLog) || "None";
		let messageLogChannel =
			message.guild.channels.cache.get(guildInfo.messageLogs) || "None";
		let globalChatChannel =
			message.guild.channels.cache.get(guildInfo.globalChatChannel) ||
			"None";

		const mainEmbed = new MessageEmbed()
			.setTitle("Settings")
			.setDescription(
				`**More information:** \`${prefix}settings [category]\``,
			)
			.addField("System", "`5` settings")
			.addField("Logging", "`2` settings")
			.setTimestamp()
			.setColor("#6082b6")
			.setFooter(`© Hurricano ${client.version}`);

		if (!args.length) return message.channel.send({ embeds: [mainEmbed] });

		switch (args[0].toLowerCase()) {
			case "system":
				const systemEmbed = new MessageEmbed()
					.setTitle("Settings: **`System`**")
					.setColor("#6082b6")
					.addField("Prefix", `\`${prefix}\``)
					.addField("System Channel", `${systemChannel}`)
					.addField("Auto Role", `${autoRole}`)
					.addField("Suggestion Channel", `${suggestionChannel}`)
					.addField("Global Chat Channel", `${globalChatChannel}`)
					.setTimestamp()
					.setFooter(`Hurricano v1.0.0`);
				await message.channel.send({ embeds: [systemEmbed] });
				break;
			case "logging":
				const loggingEmbed = new MessageEmbed()
					.setTitle("Settings: **`Logging`**")
					.setColor("#6082b6")
					.addField("Memberlog Channel", `${memberLogChannel}`)
					.addField("Messagelog Channel", `${messageLogChannel}`)
					.setTimestamp()
					.setFooter(`Hurricano v1.0.0`);
				await message.channel.send({ embeds: [loggingEmbed] });
				break;
		}
	},
});
