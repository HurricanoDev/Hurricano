const Discord = require("discord.js");
const Command = require("@Command");
const client = require("../../handlers");
module.exports = new Command({
  name: "beautify",
  cooldown: 5,
  description: "Make you more beautiful :D",
  async run(message, args) {
    const canvacord = require("canvacord");
    let person = (await client.functions.getMember(true, message, args[0]))
      .user;
    let avatar = person.displayAvatarURL({
      dynamic: false,
      format: "png",
      size: 1024,
    });
    const img = await canvacord.Canvas.beautiful(avatar);
    const embed = new Discord.MessageEmbed()
      .setTitle("What an art work.")
      .setDescription(`How amazing this art is.`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply({ embeds: [embed] });
  },
});
