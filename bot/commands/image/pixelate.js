const Discord = require("discord.js"),
  { MessageAttachment } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "pixelate",
  cooldown: 5,
  description: "Shows a pixelated version of someone's avatar!",
  async run(message, args) {
    const canvacord = require("canvacord");
    let person = (await client.functions.getMember(true, message, args[0]))
      .user;
    let avatar = person.displayAvatarURL({
      dynamic: false,
      format: "png",
      size: 1024,
    });
    const img = await canvacord.Canvas.pixelate(avatar);
    const embed = new Discord.MessageEmbed()
      .setAuthor("P i x e l a t e d .", message.author.displayAvatarURL())
      .setDescription(`${person.toString()} in Minecraft:`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply({
      embeds: [embed],
      files: [new MessageAttachment(img, "img.png")],
    });
  },
});
