import { type ConfigOptions, Config } from "./src/struct/index.mjs";

/** ✨ If you intend to use a file based configuration, this is what you're looking for. If you intend to use environmental variables, read the README. ✨ */
const options: ConfigOptions = {
		token: "", // 🔒 Your bot token.
		prefixes: [""], // ❓ Your prefixes. To add more, simply add another value in commas and quotes, ex: ["hr!", "hv!"]. Ensure to end with a comma.
		apis: {
			// 🔑 Bot API credentials. If the comment ends with a "(optional)", simply leave the value as it is, empty quotes ("").
			TopGG: "", // 🤖 Your Top.gg API key, for posting bot statistics (optional).
			Statcord: "", // 📈 Your Statcord API key (optional).
		},
		MongoDBUri: "", // 💽 Your MongoDB URI, ex: "mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin".
		botChannels: {
			// 📻 Channels to send bot messages in.
			bugReport: "", // 🐛 Channel to report bug reports in.
			feedback: "", // ☝️ Channel to send feedback to.
			serverJoin: "", // 🆕 Channel to send new server messages to.
		},
		isModified: false, // ⚠️⚠️ Ensure to modify this variable to true once you have configured everything. Leave this to false if you are using environmental variables. ⚠️⚠️
	},
	config = new Config(options);

if (!config.isModified) config.fillInEnvironmentalVariables();

export default config;
