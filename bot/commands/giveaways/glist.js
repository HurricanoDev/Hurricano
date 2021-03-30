const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = class GListCommand extends Command {
  constructor(client) {
    super(client, {
      name: "glist",
      description: "List all giveaways in your server.",
    });
  }
  async run(message, args) {
    const embed = new MessageEmbed();
    const gws = this.client.giveawaysManager.giveaways
      .filter((g) => g.guildID === message.guild.id)
      .filter((g) => !g.ended);
    if (gws.length) {
      gws.forEach((x) => embed.addField(x.prize, `work in progress, ok`));
      message.channel.send(embed);
    } else if (!gws.length) {
      message.channel.sendError(
        message,
        "No Giveaways hosted on this server.",
        "No giveaways are being hosted on this server. Please host a giveaway and try this command."
      );
    }
  }
};
