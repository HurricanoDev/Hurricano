import { Config } from "./src/struct/index.mjs";
/** ✨ If you intend to use a file based configuration, this is what you're looking for. If you intend to use environmental variables, read the README. ✨ */
const options = {
    token: "",
    prefixes: [""],
    apis: {
        // 🔑 Bot API credentials. If the comment ends with a "(optional)", simply leave the value as it is, empty quotes ("").
        TopGG: "",
        Statcord: "", // 📈 Your Statcord API key (optional).
    },
    MongoDBUri: "",
    botChannels: {
        // 📻 Channels to send bot messages in.
        bugReport: "",
        feedback: "",
        serverJoin: "", // 🆕 Channel to send new server messages to.
    },
    isModified: false, // ⚠️⚠️ Ensure to modify this variable to true once you have configured everything. Leave this to false if you are using environmental variables. ⚠️⚠️
}, config = new Config(options);
if (!config.isModified)
    config.fillInEnvironmentalVariables();
export default config;
