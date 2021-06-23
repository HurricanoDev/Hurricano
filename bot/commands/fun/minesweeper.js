const Discord = require("discord.js");
const Command = require("@Command");
const { Minesweeper } = require("../../utilities/game-apis/minesweeper.js");

module.exports = new Command({
  name: "minesweeper",
  aliases: ["mines"],
  description: "Play the famous minesweeper game!",
  clientPermissions: ["SEND_MESSAGES"],
  async run(message, args) {
    const board = new Minesweeper().start();
    const embed = new Discord.MessageEmbed()
      .setTitle('Minesweeper Game')
      .setColor("RANDOM")
      .setDescription(board)

    message.channel.send({ embeds: [embed] });
  },
});
