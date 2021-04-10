const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = class SetPrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: "setprefix",
      aliases: ["sp", "setp"],
      userPermissions: ["ADMINISTRATOR"],
      args: "Please mention what you would like to set as your prefix!",
      cooldown: 20,
      description: "Set your server's custom prefix!",
      slash: true,
      double: true,
      options: [
        {
          name: "Prefix",
          description: "What you would you like to set your prefix as.",
          type: 3,
          required: true,
        },
      ],
    });
  }
  async run(message, args, quicksend) {
    const embed = new MessageEmbed().setAuthor(
      "Server Settings Change.",
      "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
    );
    if (message.token) {
      const prefix = args[0].value;

      await client.db.guild.updatePrefix(message.guild_id, prefix);

      embed.setDescription(
        "The server prefix has now been changed to **`" + prefix + "`**."
      );
      quicksend(message, embed);
    } else {
      const prefix = args[0];

      await message.client.db.guild.updatePrefix(message.guild.id, prefix);

      message.sendSuccessReply(
        "Server Settings Change.",
        "The server prefix has now been changed to **`" + prefix + "`**."
      );
    }
  }
};
