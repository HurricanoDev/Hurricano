module.exports = ({ merge }) =>
	merge({
		db: {
			fetch: async () => {
				if (this.user.bot) return;

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
				.setAuthor(header, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png")
				.setColor("RED");

			if (msg) embed.setDescription(msg);
			if (footer) embed.setFooter(...footer);
			else {
				embed.setFooter(message.author.username, message.author.displayAvatarURL());
			}
			if (fields) embed.addFields(fields);

			return this.createDM().then((x) => x.send({ embeds: [embed] }));
		},
		sendSuccess(message, header, msg, footer, fields) {
			const embed = new MessageEmbed()
				.setAuthor(Header, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png")
				.setColor("GREEN");
			if (msg) embed.setDescription(Msg);
			if (Footer) embed.setFooter(Footer);
			else embed.setFooter(message.author.username, message.author.displayAvatarURL());
			if (fields) embed.addFields(fields);

			return this.createDM().then((x) => x.send({ embeds: [embed] }));
		},
	});
