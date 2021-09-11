const Command = require("@structures/Command.js");

module.exports = new Command({
	name: "starboard",
	userPermissions: ["ADMINISTRATOR"],
	description: "Set/remove the starboard channel in your server.",
	async run({ message, args }) {
		const guildData = client.db.guilds.cache.get(message.guild.id);
		const optionsEmbed = client.utils.createOptionsEmbed(
			"Starboard",
			"starboard",
			"None",
			"ADMINISTRATOR",
			"`set` Set a starboard channel\n`remove` Remove the current starboard channel",
			`${message._usedPrefix}`,
		);

		if (!args.length)
			return message.channel.send({ embeds: [optionsEmbed] });

		switch (args[0].toLowerCase()) {
			case "set":
				const SBChannel = await client.utils.getChannel(
					false,
					message,
					args,
				);

				if (!SBChannel)
					return message.sendErrorReply(
						"Error",
						"You need to give me a valid channel!",
					);
				guildData.starBoard.channel = SBChannel.id;
				await guildData.save();
				message.channel.sendSuccess(
					message,
					"Done!",
					`The \`starboard\` channel was set => ${SBChannel}`,
				);
				break;
			case "remove":
				if (!guildData.starBoard)
					return message.sendErrorReply(
						"Error!",
						"There is no existing starboard channel to remove!",
					);
				guildData.starBoard.channel = null;
				await guildData.save();
				await message.guild.db.fetch();
				message.channel.sendSuccess(
					"Done!",
					`The starboard channel was successfully removed!`,
				);
				break;
		}
	},
});
