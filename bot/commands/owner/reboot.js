const { MessageEmbed } = require("discord.js");
const Command = require('@Command');
module.exports = class RebootCommand extends Command {
  constructor(client) {
    super(client, {
  name: "reboot",
  description: "reboot the bot.",
    });
  };
  async run(message, args) {
    (await message.sendSuccessReply('Reboot Initiated.', 'Rebooting now.'));
    process.exit(0);
  }
};
