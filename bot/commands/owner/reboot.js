const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "reboot",
  description: "reboot the bot.",
  run: async (message, args) => {
    (await message.sendSuccessReply('Reboot Initiated.', 'Rebooting now.'));
    process.exit(0);
  },
};
