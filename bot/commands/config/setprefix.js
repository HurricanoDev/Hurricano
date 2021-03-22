const { MessageEmbed } = require("discord.js");
const command = require('@Command')
module.exports = {
  name: "setprefix",
  aliases: ["sp", "setp"],
  permissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
  args: true,
  cooldown: 20,
  description: "Set your server's custom prefix!",
  run: async (message, args) => {
    const prefix = args[0];

    await message.client.db.guild.updatePrefix(message.guild.id, prefix);

    message.sendSuccessReply(
      "Server Settings Change.",
      "The server prefix has now been changed to **`" + prefix + "`**."
    );
  },
};
