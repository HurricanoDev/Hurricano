const Discord = require("discord.js");

module.exports = {
  name: "beautify",
  description: "Beautify your profile picture.",
  args: true,
  run: async (message, args) => {
    const canvacord = require("canvacord");
    let person = message.mentions.users.first() || message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.beautiful(avatar);
    let attachment = new Discord.MessageAttachment(image, "beautiful.png");
    return message.channel.send(attachment);
  },
};
