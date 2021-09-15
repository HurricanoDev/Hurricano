import Command from "@structures/Command.js";
import Hangman from "../../utilities/game-apis/hangman.js";
export default new Command({
    name: "hangman",
    aliases: ["hangm"],
    description: "Play hangman!",
    clientPermissions: ["SEND_MESSAGES"],
    async run({ message, args }) {
        const hangman = new Hangman(message);
        hangman.newGame(message);
    },
});
