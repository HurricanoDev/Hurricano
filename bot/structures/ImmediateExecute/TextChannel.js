const { MessageActionRow, MessageEmbed } = require("discord.js");

function RegexEscape(input) {
	return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceStringsInObject(objRaw, findStr, replaceStr) {
	for (const key in Object.getOwnPropertyNames(objRaw)) {
		const value = objRaw[key];

		if (typeof value === "string") {
			let str;

			for (let i = 0; i < findStr.length; i++)
				str = str.replace(
					new RegExp(RegexEscape(findStr[i]), "g"),
					replaceStr[i]
				);

			objRaw[key] = str;
		} else if (typeof value === "object")
			replaceStringsInObject(value, findStr, replaceStr);
	}
}

module.exports = ({ merge }) =>
	merge({
		async send(optionsRaw) {
			const tokenRegex = new RegExp(
				RegexEscape(client.config.token),
				"g"
			);
			const mongoUri = new RegExp(
				RegexEscape(client.config.mongouri),
				"g"
			);
			let options =
				typeof optionsRaw === "string"
					? optionsRaw
							.replace(tokenRegex, "Bot Token.")
							.replace(mongoUri, "MongoDB Uri.")
					: replaceStringsInObject(
							optionsRaw,
							[tokenRegex, mongoUri],
							["Bot Token.", "MongoDB Uri."]
					  );
			return await super.send(options);
		},

		async sendError(message, header, msg, footer, fields, components) {
			const embed = new MessageEmbed()
				.setAuthor({
					name: header,
					iconURL:
						"https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png",
				})
				.setColor("RED");

			if (msg) embed.setDescription(msg);
			if (footer) embed.setFooter(footer);
			else
				embed.setFooter({
					name: message.author.username,
					iconURL: (
						message.member || message.author
					).displayAvatarURL(),
				});
			if (fields) embed.addFields(fields);

			return this.send({
				embeds: [embed],
				components: components.map((component) =>
					new MessageActionRow().addComponents(...component)
				),
			});
		},
		async sendSuccess(message, header, msg, footer, fields, components) {
			const embed = new MessageEmbed()
				.setAuthor({
					name: header,
					iconURL:
						"https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png",
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

			return this.send({
				embeds: [embed],
				components: components.map(
					(component) => new MessageActionRow(...component)
				),
			});
		},
	});
