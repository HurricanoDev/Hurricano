const { MessageEmbed, MessageActionRow } = require("discord.js");

function sendMsg(message, type, sendType, values) {
	const error = type.toLowerCase() == "error" ? true : false;

	const embed = new MessageEmbed()
		.setAuthor({
			name: values.header,
			iconURL: error ? client.links.errorImage : client.links.successImage,
		})
		.setColor(error ? "RED" : "GREEN")
		.setDescription(values.msg)
		.setFooter({
			text: values.footer ?? message.author.tag,
			iconURL: (message.member || message.author).displayAvatarURL(),
		});

	if (values.fields) embed.addFields(values.fields);

	return message[sendType]({
		embeds: [embed],
		components: values.components?.map((components) => new MessageActionRow().addComponents(...components)),
	});
}

module.exports = ({ merge }) =>
	merge({
		editError(header, msg, footer, fields, components) {
			return sendMsg(this, "error", "edit", {
				header,
				msg,
				footer,
				fields,
				components,
			});
		},
		editSuccess(header, msg, footer, fields, components) {
			return sendMsg(this, "success", "edit", {
				header,
				msg,
				footer,
				fields,
				components,
			});
		},
		say(options) {
			if (Array.isArray(options)) return message.channel.send({ embeds: options });
			else if (options instanceof MessageEmbed || options.embed || options.isEmbed) return message.channel.send({ embeds: [options] });
		},
		sendErrorReply(header, msg, footer, fields, components) {
			return sendMsg(this, "error", "reply", {
				header,
				msg,
				footer,
				fields,
				components,
			});
		},
		sendSuccessReply(header, msg, footer, fields, components) {
			return sendMsg(this, "success", "reply", {
				header,
				msg,
				footer,
				fields,
				components,
			});
		},
	});
