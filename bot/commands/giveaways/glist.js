const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
const moment = require("moment");
module.exports = new Command({
  name: "glist",
  description: "List all giveaways in your server.",
  async run(message, args) {
    const embed = new MessageEmbed().setAuthor(
      "Giveaway Lists:",
      "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Giveaway.gif"
    );
    const gws = this.client.giveawaysManager.giveaways
      .filter((g) => g.guildID === message.guild.id)
      .filter((g) => !g.ended);
    if (gws.length) {
      await Promise.all(
        gws.map(async (x) => {
          embed.addField(
            x.prize,
            `Started At: ${moment(x.startAt)},
        Ends At: ${moment(x.endAt)},
        URL: [here](${x.messageURL}),
        Winner Count: ${x.winnerCount},
        Channel: <#${x.channelID}>,
        Hosted By: <@${x.hostedBy.split("@")[1].split(">")[0]}>,
        ${
            x.extraData.role == null
              ? "Required Role: " +
              message.guild.roles.cache.get(x.extraData.role).toString()
              : ""
            }.`,
            true
          );
        })
      );
      message.channel.send({ embeds: [embed] });
    } else if (!gws.length) {
      return message.channel.sendError(
        message,
        "No Giveaways hosted on this server.",
        "No giveaways are being hosted on this server. Please host a giveaway and try this command."
      );
    }
  },
});
