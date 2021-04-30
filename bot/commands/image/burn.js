const Discord = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "burn",
  cooldown: 5,
  slash: true,
  double: true,
  description: "Burn someone's avatar :(",
  async run(message, args) {
    const canvacord = require('canvacord')
    let person = message.mentions.users.first() || message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: 'png' });
    let img = await canvacord.Canvas.burn(avatar, 4)
    let attachment = new Discord.MessageAttachment(img, "burn.png");
    message.channel.send(attachment)
  },
});
