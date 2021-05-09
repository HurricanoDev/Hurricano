const Discord = require("discord.js");
const Command = require("@Command");

module.exports = new Command({
  name: "trigger",
  cooldown: 5,
  description: "Shows a triggered version of someone's avatar!",
  async run(message, args) {
    const canvacord = require("canvacord");
    let person = (await client.functions.getMember(true, message, args[0]))
      .user;
    let avatar = person.displayAvatarURL({
      dynamic: false,
      format: "png",
      size: 1024,
    });
    const img = await canvacord.Canvas.trigger(avatar);
    const embed = new Discord.MessageEmbed()
      .setTitle("Triggered!")
      .setDescription(`${person} is so triggered.`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply(embed);
  },
});
