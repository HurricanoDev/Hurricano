import Command from "@structures/Command.js";
import Calc from "../../utilities/Calculator.js";
export default new Command({
    name: "calculator",
    description: "Calculate a value.",
    cooldown: 40,
    async run({ message }) {
        await Calc(message);
    },
});
