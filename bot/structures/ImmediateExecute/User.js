const { MessageEmbed } = require("discord.js");

module.exports = ({ merge }) =>
	merge({
		db: {
			fetch: async () => {
				const data = await client.schemas.user.findOne({ id: this.id });
				client.db.users.cache.set(this.id, data);
				return data;
			},
			cache: () => {
				return client.db.users.cache.get(this.id);
			},
		},
		sendError(message, header, msg, footer, fields) {
			const embed = new MessageEmbed()
				.setAuthor({
					name: header,
					iconURL: "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png",
				})
				.setColor("RED");

			if (msg) embed.setDescription(msg);
			if (footer) embed.setFooter(footer);
			else
				embed.setFooter({
					name: message.author.username,
					iconURL: message.author.displayAvatarURL(),
				});
			if (fields) embed.addFields(fields);

			return this.createDM().then((x) => x.send({ embeds: [embed] }));
		},
		async sendSuccess(message, header, msg, footer, fields) {
			const embed = new MessageEmbed()
				.setAuthor({
					name: header,
					iconURL: "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png",
				})
				.setColor("GREEN");

			if (msg) embed.setDescription(msg);
			if (footer) embed.setFooter(footer);
			else
				embed.setFooter({
					name: message.author.username,
					iconURL: message.author.displayAvatarURL(),
				});
			if (fields) embed.addFields(fields);

			return this.createDM().then((x) => x.send({ embeds: [embed] }));
		},
	});
