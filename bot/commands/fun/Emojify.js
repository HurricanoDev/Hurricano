const Discord = require("discord.js");
const Command = require("@Command");
const emoji = require('discord-emoji-convert');

module.exports = new Command({
  name: "emojify",
  userPermissions: ["SEND_MESSAGES"],
  cooldown: 20,
  description:
    "emojifies the text provided by the user.",
  async run(message, args) {
     var arg = message.content.split(" ").slice(1).join(" ");
    if(!arg) return message.channel.send("What do you want me to emojify?");
    let emojis = emoji.convert(arg)
    message.channel.send(emojis);
  },
});
