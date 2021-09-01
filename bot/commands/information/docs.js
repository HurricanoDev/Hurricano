const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = new Command({
	name: "docs",
	description: "See docs for npm, mdn or discord.js",
	args: "Please provide whether you would like to check docs from discord.js, mdn, or npm!",
	async run(message, args) {
		const validDocs = ["discord.js", "djs", "discordjs"];
		if (!validDocs.includes(args[0]))
			return message.reply(
				"Please provide a valid docs source! Currently valid sources: \n `discord.js`",
			);
		switch (args[0]) {
			case "discord.js":
			case "djs":
			case "discordjs":
				if (!args[1])
					return message.reply(
						"Please provide what you would like to check docs of in discord.js!",
					);
				let msg;
				const branch = args.join(" ").includes("--src=")
					? args.join(" ").split("--src=")[1].split(/ +/g)[0]
					: "stable";

				const embed = await fetch(
					`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(
						args[1],
					)}`,
				).then((f) => f.json());
				if (!embed)
					return message.reply(
						"Nothing were found for your query in the discord.js docs.",
					);

				msg = await message.reply({ embeds: [embed] });

				msg.react("🗑️");
				let confirmation = await msg
					.awaitReactions({
						filter: (reaction, user) =>
							reaction.emoji.name === "🗑️" &&
							user.id === message.author.id,
						max: 1,
						time: 10000,
						errors: ["time"],
					})
					.catch((e) => msg.reactions.removeAll());

				if (confirmation?.size) msg.delete();
				break;
		}
	},
});
