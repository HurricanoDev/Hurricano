const Discord = require("discord.js");
const Command = require("@Command");
const SnakeGame = require('../../utilites/game-apis/snake.js');

module.exports = new Command({
  name: "snake",
  aliases: ["snek"],
  description: "Play the snake game!",
  clientPermissions: ["SEND_MESSAGES"],
  async run(message, args) {
    const snakeGame = new SnakeGame(client);
    snakeGame.newGame(message);
  },
});
