const { MessageEmbed } = require("discord.js"),
	Menu = require("../../utilities/ButtonMenu.js"),
	emojis = require("../../utilities/emojis.json"),
	tips = [
		"The first person convicted of speeding was going eight mph.",
		'"New car smell" is the scent of dozens of chemicals.',
		"Some sea snakes can breathe through their skin.",
		"The heads on Easter Island have bodies.",
		"The moon has moonquakes.",
		"Humans are the only animals that blush.",
		"The wood frog can hold its pee for up to eight months.",
		"The feeling of getting lost inside a mall is known as the Gruen transfer.",
		"You lose up to 30 percent of your taste buds during flight.",
		"Cotton candy was invented by a dentist.",
		"Sharks can live for five centuries.",
		"The world wastes about 1 billion metric tons of food each year. Help reduce that number and stop wasting food :D",
		"Wait! If you wait, good things will come to you!",
	];

function getEmoji(emoji) {
	let emote;
	if (!isNaN(emoji)) emote = client.emojis.cache.get(emoji.toString());
	else emote = emoji;
	return emote;
}

function splitEmoji(emojiRaw) {
	const EmojiID = emojis.categories[emojiRaw];
	if (/\p{Extended_Pictographic}/u.test(EmojiID)) return EmojiID;

	return EmojiID.split(":")[2].split("<")[0].split(">")[0];
}

const Command = require("@structures/Command.js");

module.exports = new Command({
	name: "help",
	description:
		"Shows the commands list and also specific command categories/commands!",
	aliases: ["cmd", "commands", "h"],
	async run({ message, args }) {
		let TIP = Math.floor(Math.random() * tips.length);
		let Fact = tips[TIP];
		let inline = true;
		const pref = message._usedPrefix;
		if (args.length) {
			const cmd =
				client.commands.get(args[0]) ||
				client.commands.get(client.commands.aliases.get(args[0]));
			if (!cmd)
				return message.sendErrorReply(
					"Invalid Command Provided.",
					"I could not find the command you provided.",
					"Provide a valid command next time, smh.",
				);
			const emb = new MessageEmbed()
				.setTitle(`Command Help: ${cmd.name}`)
				.setAuthor(
					message.member.displayName,
					message.author.displayAvatarURL({ dynamic: true }),
				)
				.setDescription(cmd.description)
				.addField("Category", `\`${cmd.category}\``, true);
			emb.setThumbnail(this.client.user.avatarURL());
			if (Array.isArray(cmd.usage))
				emb.addField("Usage", `\`${pref}${cmd.usage}\``, true);
			else emb.addField("Usage", "No usage provided.", true);
			if (Array.isArray(cmd.aliases))
				emb.addField(
					"Aliases",
					cmd.aliases.map((alias) => `\`${pref}${alias}\``).join(" "),
					true,
				);
			else emb.addField("Aliases", "No aliases provided.", true);
			if (Array.isArray(cmd.usage))
				emb.addField(
					"Examples",
					cmd.examples.map((ex) => `\`${pref}${ex}\``).join("\n"),
					true,
				);
			else emb.addField("Examples", "No examples provided.", true);
			emb.setFooter("Copyright Hurricano™");
			if (cmd.slash?.isSlash) emb.addField("Slash", "Yes.", true);
			else emb.addField("Slash", "No.", true);
			if (cmd.slash?.isNormal)
				emb.addField("Both Slash And Normal?", "Yes.", true);
			else emb.addField("Both Slash And Normal?", "No.", true);
			message.channel.send({ embeds: [emb] });
		} else {
			let cmdmap = {};
			client.commands.forEach((command) => {
				if (!cmdmap[command.category]) cmdmap[command.category] = [];
				if (command.slash.isSlash && !command.slash.isNormal)
					cmdmap[command.category].push(
						`\`[Slash Command] ${command.name}\`, `,
					);
				if (!command.slash.isSlash)
					cmdmap[command.category].push(`\`${command.name}\`, `);
				if (command.slash.isSlash && command.slash.isNormal)
					cmdmap[command.category].push(
						`\`[Slash And Normal Command] ${command.name}\`, `,
					);
			});

			const emojimap = {
				["giveaways"]: splitEmoji("giveaways"),
				["owner"]: splitEmoji("owner"),
				["music"]: splitEmoji("music"),
				["moderation"]: splitEmoji("moderation"),
				["config"]: splitEmoji("config"),
				["information"]: splitEmoji("information"),
				["fun"]: splitEmoji("fun"),
				["image"]: splitEmoji("image"),
				["levelling"]: splitEmoji("levelling"),
				["utility"]: splitEmoji("utility"),
				["suggestions"]: splitEmoji("suggestions"),
				["economy"]: splitEmoji("economy"),
			};
			const main = new MessageEmbed()
				.setTitle("Help Categories")
				.setDescription(
					"React to the respective emojis below. This message will edit when reacting to an emoji. **Please wait for me to add the reactions first, before reacting!**",
				)
				.setColor("#ffb6c1")
				.addField(
					`> ${getEmoji(emojimap.config)} Config`,
					"The commands meant to modify the bot.",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.information)}  Information`,
					"Pretty self-explanitory! This module is meant for information commands.",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.fun)}  Fun`,
					"Commands in which you're sure to have fun!",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.giveaways)}  Giveaways`,
					"Host giveaways with Hurricano™️!",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.image)}  Image Manipulation`,
					"Make funny images with Hurricano™️!",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.moderation)}  Moderation`,
					"Let Hurricano™️ help the moderators and admins with its moderation system!",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.levelling)}  Levelling`,
					"Commands for Hurricano™️'s levelling module!",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.music)}  Music`,
					"Feel like listening to some music? You can do it with Hurricano™️!",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.utility)}  Utility`,
					"Want some handy tools? Well, here you go!",
					inline,
				)
				.addField(
					`> ${getEmoji(emojimap.suggestions)} Suggestions`,
					"Commands related to the server suggestions system!",
					true,
				)
				.addField(
					`> ${getEmoji(emojimap.economy)}  Economy`,
					"Wanna earn some of my money? Try out my economy system!",
					inline,
				);

			client.config.ownerIds.includes(message.author.id)
				? main.addField(
						`> ${emojis.categories.owner}  Owner`,
						"Commands meant for the bot owners.",
						inline,
				  )
				: null;

			main.addField(":bulb:  Fact:", `**${Fact}**`).setFooter(
				"Copyright Hurricano™",
			);

			let helpMenu = new Menu(message, main, {
				[emojimap.config]: config,
				[emojimap.information]: information,
				[emojimap.fun]: fun,
				[emojimap.giveaways]: giveaways,
				[emojimap.image]: image,
				[emojimap.moderation]: moderation,
				[emojimap.levelling]: levelling,
				[emojimap.music]: music,
				[emojimap.utility]: utility,
				[emojimap.suggestions]: suggestions,
				[emojimap.economy]: economy,
				[emojimap.owner]: client.config.ownerIds.includes(
					message.author.id,
				)
					? owner
					: null,
			});
			await helpMenu.start();
		}
	},
});
