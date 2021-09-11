const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "GuildMember",
	extend({ GuildMember, bind }) {
		Object.defineProperties(
			GuildMember,
			bind(
				{
					db: {
						value: {
							async fetch() {
								const data = await client.schemas.user.findOne({
									id: this.id,
								});
								client.db.guilds.cache.set(this.id, data);
								return data;
							},
							cache() {
								return client.db.guilds.cache.get(this.id);
							},
						},
					},
					sendError: {
						value: async function sendError(
							message,
							Header,
							Msg,
							Footer,
							Fields,
						) {
							const embed = new MessageEmbed()
								.setAuthor(
									Header,
									"https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png",
								)
								.setColor("RED");

							if (Msg) {
								embed.setDescription(Msg);
							}
							if (Footer) {
								embed.setFooter(Footer);
							} else {
								embed.setFooter(
									message.author.username,
									message.author.displayAvatarURL(),
								);
							}
							if (Fields) embed.addFields(Fields);
							const msg = await this.createDM().then((x) =>
								x.send({ embeds: [embed] }),
							);
							return msg;
						},
					},
					sendSuccess: {
						value: async function sendSuccess(
							message,
							Header,
							Msg,
							Footer,
							Fields,
						) {
							const embed = new MessageEmbed()
								.setAuthor(
									Header,
									"https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png",
								)
								.setColor("GREEN");
							if (Msg) {
								embed.setDescription(Msg);
							}
							if (Footer) {
								embed.setFooter(Footer);
							} else {
								embed.setFooter(
									message.author.username,
									message.author.displayAvatarURL(),
								);
							}
							if (Fields) embed.addFields(Fields);
							const msg = await this.createDM().then((x) =>
								x.send({ embeds: [embed] }),
							);
							return msg;
						},
					},
				},
				GuildMember,
			),
		);
	},
};
