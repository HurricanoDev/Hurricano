const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = new Command({
	name: "github",
	aliases: ["github", "gh"],
	cooldown: 30,
	usage: "github <user> repository",
	description: "fetches the github repo of through the information provided by the user",
	async run(message, args) {
		if (!args.length) return message.channel.sendError(message, "An Error Occured.", "Please provide a user to check the repo of.");
		if (!args[1] && !args[0].includes("/"))
			return message.channel.sendError(message, "An Error Occured.", "Please provide a repository of the user.");
		let query = `${args[0]}/${args[1]}`;
		if (!args[1] && args[0].includes("/")) query = args[0];
		let uri = await fetch(`https://api.github.com/repos/${query}`);

		// Check the fetch status, if it's 200 then return embed with information
		if (uri.status === 200) {
			let uriJson = await uri.json();
			let embed = new MessageEmbed()
				.setAuthor(uriJson.owner.login, uriJson.owner.avatar_url)
				.setDescription(`${uriJson.description}\n[Repository Link](${uriJson.html_url})\n`)
				.addField("Repo Name :notepad_spiral:", `${uriJson.name}`, true)
				.addField("Stars :star:", `${uriJson.stargazers_count}`, true)
				.addField("Forks :gear:", `${uriJson.forks}`, true)
				.addField("Language :desktop:", `${uriJson.language}`, true)
				.setImage(uriJson.owner.avatar_url)
				.setColor("#ffff");
			return message.channel.send({ embeds: [embed] });
		} else {
			return message.channel.send(
				"Unable to find the mentioned repository. Please make sure you have entered the correct user/repository. `hr!github [user] [repository]`",
			);
		}
	},
});
