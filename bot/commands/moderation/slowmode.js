const Command = require("@Command");
const Discord = require("discord.js");
module.exports = new Command({
	name: "slowmode",
	description: "lets the user add a per-message timeout in the channel the command is used.",
	userPermissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
	async run(message, args) {
		String.prototype.toHHMMSS = function () {
			var sec_num = parseInt(this, 10);
			var hours = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - hours * 3600) / 60);
			var seconds = sec_num - hours * 3600 - minutes * 60;

			if (hours < 10) {
				hours = "0" + hours;
			}
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			return hours + ":" + minutes + ":" + seconds;
		};

		const time = args[0];
		if (!time) {
			return message.channel.send(`${message.author}, specify a time.\nUsage: \`.slowmode <time>\``);
		}
		if (isNaN(time)) {
			return message.channel.send(`${message.author}, **${time}** is not a number.\nUsage: \`n.slowmode <time>\``);
		}

		message.channel.setRateLimitPerUser(time);
		message.channel.send(`Slowmode in ${message.channel} set to \`${time.toHHMMSS()}\``);
	},
});
