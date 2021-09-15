import Command from "@structures/Command.js";
import { createBattle } from "../../utilities/game-apis/battle.js";
export default new Command({
    name: "battle",
    aliases: ["fight"],
    description: "Battle someone!",
    clientPermissions: ["SEND_MESSAGES"],
    args: "Please provide a valid user to battle against.",
    async run({ message, args }) {
        const member = await client.utils.getMember(true, { message, args }[0]);
        if (!member)
            return message.sendErrorReply("Error!", "Please give me who you want to battle against!");
        createBattle(member, message);
    },
});
