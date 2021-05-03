const Discord = require("discord.js");
const Command = require("@Command");
const { APIMessage } = require("discord.js");

module.exports = new Command({
  name: "test",
  description: "Returns the bot's ping!",
  slash: true,
  options: [
    {
      name: "Text",
      description: "What you want the bot to say.",
      type: 3,
      required: true,
    },
  ],
  async run(message, args, quicksend) {
    quicksend(message, args[0].value);
  },
});
