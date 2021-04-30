const Discord = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "facepalm",
  cooldown: 5,
  description: "Make your own facepalm image with your/mentions avatar.",
  async run(message, args) {
    const canvacord = require("canvacord");
    let person = message.mentions.users.first() || message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    let avatar2 = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let image = await canvacord.Canvas.facepalm(avatar);
    let attachment = new Discord.MessageAttachment(image, "facepalm.png");
    return message.reply(attachment);
  },
});
