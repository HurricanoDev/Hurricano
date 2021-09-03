const Command = require("@structures/Command.js");
const Calc = require("../../utilities/Calculator.js");

module.exports = new Command({
	name: "calculator",
	description: "Calculate a value.",
	cooldown: 40,
	async run(message) {
		await Calc(message);
	},
});
