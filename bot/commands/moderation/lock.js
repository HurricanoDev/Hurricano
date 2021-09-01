var Discord = require("discord.js");
const ms = require("../../utilities/ms.js");
const Command = require("@Command");
module.exports = new Command({
	name: "lock",
	description: "Locks down a channel",
	userPermissions: ["MANAGE_CHANNELS"],
	async run(message, args) {
		const prefix = message._usedPrefix;
		if (!args.length) {
			message.channel.sendError(
				message,
				"Invalid Arguments.",
				`Please provide valid arguments. Arguments you can use: \n \`${prefix}lock none\`: Locks the channel until you unlock it. \n \`${prefix}lock {time}\`: Locks the channel for a specific amount of time. \n S stands for seconds, \n H stands for hours, \n D stands for days. \n You can also use the channel argument to choose which channel you would like to lock. Ex: \`${prefix}lock none #general\` or \`${prefix}lock 20m #general\``,
			);
			return;
		}
		let lockit = [];
		let channel =
			message.guild.channels.cache.get(args[1]) ||
			message.mentions.channels.first() ||
			message.guild.channels.cache.find((x) => x.name == args[1]) ||
			message.channel;
		if (!channel) {
			message.channel.sendError(
				"Invalid Channel Provided.",
				"Please provide a valid channel.",
			);
		}
		let validUnlocks = ["release", "unlock"];
		if (
			!channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") &&
			!validUnlocks.includes(args[0])
		) {
			message.channel.sendError(
				message,
				"Already Locked.",
				`The channel you provided, ${channel}, is already locked. Use \`${prefix}lock unlock\` to unlock it.`,
			);
			return;
		}
		let time = null;
		if (
			args[0].toLowerCase() !== "none" &&
			!validUnlocks.includes(args[0])
		) {
			time = ms(args[0]);
		} else if (args[0] === "none" || validUnlocks.includes(args[0])) {
			time = args[0];
		}
		if (!time) {
			message.channel.sendError(
				message,
				"Time Error.",
				"Please provide a valid time. \n You must set a duration for the lockdown in either hours, minutes or seconds.",
			);
		}
		if (validUnlocks.includes(time)) {
			await channel.createOverwrite(message.guild.id, {
				SEND_MESSAGES: null,
			});
			var liftedembed = new Discord.MessageEmbed()
				.setTitle("🔒 Lockdown")
				.setDescription("🔓 Lockdown lifted.")
				.setColor("36393e");
			await channel.send({ embeds: [liftedembed] });
			await clearTimeout(lockit[channel.id]);
			await delete lockit[channel.id];
			message.sendSuccessReply(
				"Success.",
				`Successfully lifted the lock in ${channel}.`,
			);
		} else {
			await channel.createOverwrite(message.guild.id, {
				SEND_MESSAGES: false,
			});
			const lockdownembed = new Discord.MessageEmbed()
				.setTitle("🔒 Channel Locked")
				.addField("Locked by", message.author, true)
				.setFooter(
					`To unlock, use '${await message.client.db.guilds.getPrefix(
						message.guild.id,
					)}lock unlock'`,
				)
				.setColor("36393e");
			if (time != "none") {
				lockdownembed.addField(
					"Locked for",
					ms(time, { long: true }),
					true,
				);
			}
			await channel.send({ embeds: [lockdownembed] });
			await message.sendSuccessReply(
				"Success.",
				`Successfully locked ${channel}.`,
				`To unlock it, use '${await message.client.db.guilds.getPrefix(
					message.guild.id,
				)}lock unlock ${channel.name}'`,
			);
			if (time !== "none") {
				lockit[channel.id] = setTimeout(async () => {
					var liftedembed = new Discord.MessageEmbed()
						.setTitle("🔒 Lockdown")
						.setDescription("🔓 Lockdown lifted.")
						.setColor("36393e");
					await channel.createOverwrite(message.guild.id, {
						SEND_MESSAGES: null,
					});
					await channel
						.send({ embeds: [lockdownembed] })
						.catch((x) => client.logger.warn(x));
					delete lockit[channel.id];
				}, time);
			}
		}
	},
});
