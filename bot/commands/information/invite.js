const Discord = require("discord.js");
const emojis = require("../../utilities/emojis.json");
const Command = require("@Command");
module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      aliases: ["inv"],
      description: "Invite The Bot!",
    });
  }
  async run(message) {
    const embed = new Discord.MessageEmbed()
      .setAuthor("Invite Hurricano™")
      .addField(
        emojis.signs.plus + "  Invite Link",
        "Click [here](https://discord.com/oauth2/authorize?client_id=803169312827113483&scope=bot&permissions=8589934591&scope=applications.commands%20bot) to invite the bot."
      )
      .addField(
        emojis.signs.info + "  Support Server Link",
        "Click [here](https://discord.gg/dNc3EvABCA) to join the support server."
      )
      .setColor("#90ee90")
      .setImage(
        "https://media.discordapp.net/attachments/770953232318726144/804251677950869514/Untitled_9.jpg?width=1025&height=342"
      );
    message.reply(embed);
  }
};
