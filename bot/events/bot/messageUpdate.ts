const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../../structures/internal/BaseEvent.js");

module.exports = class messageUpdate extends BaseEvent {
	constructor(client) {
		super("messageUpdate", {
			description:
				"messageUpdate event, meant for snipe command and message logs.",
			client,
		});
	}
	async run(oldMessage, newMessage, client) {
		let snipeArray = client.snipes.edited.get(newMessage.channel.id) ?? [];
		const snipeObject = {
			content: oldMessage.content,
			author: oldMessage.author,
			member: oldMessage.member,
			images:
				oldMessage.attachments.first() &&
				oldMessage.attachments != newMessage.attachments
					? oldMessage.attachments.map((x) => x.proxyURL)
					: null,
		};
		snipeArray.push(snipeObject);
		client.snipes.edited.set(newMessage.channel.id, snipeArray);
		snipeObject.action = "edit";
		let recentSnipeArray =
			client.snipes.recent.get(newMessage.channel.id) ?? [];
		recentSnipeArray.push(snipeObject);
		client.snipes.recent.set(newMessage.channel.id, recentSnipeArray);
		if (newMessage.webhookID) return;
		let cacheCheck = oldMessage.channel.messages.cache.get(oldMessage.id);
		if (newMessage.member && cacheCheck) {
			client.emit("message", newMessage);
		}
		const guildSchema = client.db.guilds.cache.get(newMessage.guild.id);
		if (guildSchema.messageLogs) {
			const guildChannel = await client.channels
				.fetch(guildSchema.messageLogs)
				.catch(() => {});
			if (!guildChannel) return;
			let embed = new MessageEmbed()
				.setAuthor(
					`Message Edited By ${oldMessage.author?.tag}! | (ID: ${oldMessage.author?.id})`,
					oldMessage.author.displayAvatarURL(),
				)
				.setDescription(
					`${
						newMessage.content.length > 2034
							? "Message content is larger than 2034 characters!"
							: "**Content:**\n" + newMessage.toString()
					}`,
				)
				.addField("Channel:", `${newMessage.channel}`)
				.setFooter(
					`Deleted by ${newMessage.author?.tag} | ${newMessage.author?.id}`,
				)
				.setColor("#6082b6");
			oldMessage.attachments.first() &&
			oldMessage.attachments != newMessage.attachments
				? (() => {
						embed.addField(
							"Images:",
							snipeObject.images.join(", \n"),
						);
				  })()
				: embed.addField("Images:", "No new images attached/edited.");

			guildChannel.send({ embeds: [embed] });
		}
	}
};
