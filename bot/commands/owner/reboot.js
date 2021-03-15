const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "reboot",
  description: "reboot the bot.",
  run: async (message, args) => {
    await message.channel.send({
      embed: {
        title: "Reboot Engaged.",
        description: "Rebooting now.",
      },
    });
    process.exit(0);
  },
};
