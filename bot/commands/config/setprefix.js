const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = class SetPrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: "setprefix",
      aliases: ["sp", "setp"],
      userPermissions: ["MANAGE_SERVER"],
      args: true,
      cooldown: 20,
      description: "Set your server's custom prefix!",
    });
  }
  async run(message, args) {
    const prefix = args[0];

    await message.client.db.guild.updatePrefix(message.guild.id, prefix);

    message.sendSuccessReply(
      "Server Settings Change.",
      "The server prefix has now been changed to **`" + prefix + "`**."
    );
  }
};
