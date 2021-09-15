import Command from "@structures/Command.js";
import SnakeGame from "../../utilities/snake.js";
export default new Command({
    name: "snake",
    aliases: ["snek"],
    description: "Play the snake game!",
    clientPermissions: ["SEND_MESSAGES"],
    async run({ message, args }) {
        const snakeGame = new SnakeGame(message);
        snakeGame.newGame();
    },
});
