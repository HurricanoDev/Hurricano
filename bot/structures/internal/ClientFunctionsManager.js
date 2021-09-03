// eslint-disable-next-line no-unused-vars
const { HurricanoClient } = require("./Client.js"),
	// eslint-disable-next-line no-unused-vars
	{ Message, CommandInteraction, MessageEmbed } = require("discord.js"),
	// eslint-disable-next-line no-unused-vars
	Command = require("./Command.js"),
	{ resolve } = require("path"),
	{ readdirSync } = require("fs");

/**
 * Manager for all custom client functions.
 */

module.exports = class ClientFunctionsManager {
	/**
	 * Initializes the class.
	 * @param {HurricanoClient} client
	 */

	constructor(client) {
		/**
		 * Hurricano's client.
		 * @type {HurricanoClient}
		 */

		this.client = client;
	}
	/**
	 * Creates an embed for invalid arguments.
	 * @param {Command} command
	 * @param {Message | CommandInteraction} message
	 * @returns {MessageEmbed}
	 */

	createOptionsEmbed(command, message) {
		const optionsEmbed = new MessageEmbed()
			.setAuthor(`${command.name} Help`, this.user.displayAvatarURL())
			.setColor("#606365")
			.addField(
				"Usage:",
				`${`\`${command.usage}\`` ?? "No usage provided."}`,
			)
			.addField(
				"Permissions",
				command.userPermissions?.length
					? command.userPermissions.map((x) => `\`${x}\``).join(", ")
					: "No user permissions required.",
			)
			.addField("Subcommands:", `${command.subCommands}`)
			.setFooter(
				`Type ${message._usedPrefix}help <command> for more info on a command.`,
			);

		return optionsEmbed;
	}
	async getMember(returnAuthor, message, ...args) {
		if (!returnAuthor && returnAuthor !== false)
			throw new Error("Returning message.author not specified.");
		if (!message) throw new Error("Message object not provided.");
		if (!args.length) throw new Error("Arguments string not provided.");
		if (typeof returnAuthor !== "boolean")
			throw new Error(
				"Whether to return author or not option is not boolean.",
			);
		if (typeof message !== "object")
			throw new Error("Message provided is not an object.");
		args = args[0];
		let user;
		if (message.mentions?.members.first())
			user = message.mentions.members.first();
		else user = await message.guild.members.fetch(args).catch(() => {});
		if (user && user.size) user = null;

		if (returnAuthor && !user) return message.member;
		if (user) return user;
		if (!user) return null;
	}
	async getChannel(returnChannel, message, ...args) {
		if (!returnChannel && returnChannel !== false)
			throw new Error(`Returning message.author not specified.`);
		if (!message) throw new Error(`Message object not provided.`);
		if (!args.length) throw new Error(`Arguments string not provided.`);
		if (typeof returnChannel !== "boolean")
			throw new Error(
				`Whether to return channel or not option is not boolean.`,
			);
		if (typeof message !== "object")
			throw new Error(`Message provided is not an object.`);
		args = args[0];
		let user;
		if (message.mentions?.channels.first())
			user =
				message.mentions?.channels.first() ||
				message.guild.channels.cache.find((x) => x.name === args);
		else user = message.guild.channels.cache.get(args);
		if (returnChannel && !user) return message.channel;
		if (user) return user;
		if (!user) return null;
	}

	/**
	 * Creates a user database from a user object and returns it.
	 * @param {import("discord.js").User} user User to create from.
	 * @returns {{ ...any }}
	 */

	async createUserDB(user) {
		return await new this.client.schemas.user({
			name: user.name,
			id: user.id,
		}).save();
	}

	/**
	 * Gets ordinal suffix for a number (Ex: 2 => 2nd).
	 * @param {Number} i Number to get ordinal suffix for.
	 * @returns {String}
	 */

	getOrdinalSuffix(i) {
		var j = i % 10,
			k = i % 100;
		if (j == 1 && k != 11) {
			return i + "st";
		}
		if (j == 2 && k != 12) {
			return i + "nd";
		}
		if (j == 3 && k != 13) {
			return i + "rd";
		}
		return i + "th";
	}

	/**
	 * Makes the first letter of a string uppercase.
	 * @param {String} string String to capitalize.
	 * @returns {String}
	 */

	capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * Shuffles a string.
	 * @param {String} content String to shuffle.
	 * @returns {String}
	 */

	shuffle(content) {
		var a = content.split(""),
			n = a.length;

		for (var i = n - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var tmp = a[i];
			a[i] = a[j];
			a[j] = tmp;
		}
		return a.join("");
	}

	/**
	 * Checks if a value has a number.
	 * @param {any} number Number to check from.
	 * @returns {Boolean}
	 */

	hasNumber(number) {
		return /\d/.test(number);
	}

	/**
	 * Shuffles an array's values.
	 * @param {Array<any>} array Array to shuffle.
	 * @returns {Array<any>}
	 */

	shuffleArray(array) {
		const shuffledArray = array.sort(() => 0.5 - Math.random());
		return shuffledArray;
	}

	/**
	 * Binds all functions in an object.
	 * @param {{ ...any }} obj Object to bind to.
	 * @param {{ ...any }} that Context to bind with.
	 * @returns {{ ...any }}
	 */

	bindObject(obj, that) {
		return Object.keys(obj).reduce((acc, key) => {
			switch (typeof obj[key]) {
				case "object":
					// eslint
					return {
						...acc,
						[key]: this.recursiveBind(obj[key], that),
					};

				case "function":
					return { ...acc, [key]: obj[key].bind(that) };
			}

			return { ...acc, [key]: obj[key] };
		}, {});
	}

	/**
	 * Loads structures.
	 * @param {String} path Path to discord.js structures.
	 * @returns {void}
	 */

	loadStructures(path) {
		const files = readdirSync(resolve(path));
		for (const file of files) {
			const struct = require(resolve(path, file));

			struct.extend({
				[struct.name]: require("discord.js")[struct.name].prototype,
				bind: this.bindObject,
			});
		}
	}
	defineIds(that, propName, value) {
		const Ids = ["Id", "iD", "id"];

		for (const id of Ids) {
			const IdProp = [propName, id];

			that[IdProp.join("_")] = value;
			that[IdProp.join()] = value;
		};

		return that;
	}
};
