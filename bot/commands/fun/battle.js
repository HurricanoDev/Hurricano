const Discord = require("discord.js");
const Command = require("@Command");
const { createBattle } = require("../../utilities/game-apis/battle.js");

module.exports = new Command({
  name: "battle",
  aliases: ["fight"],
  description: "Battle someone!",
  clientPermissions: ["SEND_MESSAGES"],
  async run(message, args) {
    const member = message.mentions.members.first();
    if(!member) return message.sendErrorReply("Error!", "Please give me who you want to battle against!");

    createBattle(member, message);
  },
});
