const Command = require("@Command");
const Calc = require("../../utilities/Calculator.js");
module.exports = new Command({
	name: "calculator",
	description: "Calculate a value.",
	cooldown: 40,
	async run(message, args) {
		await Calc(message);
	},
});
