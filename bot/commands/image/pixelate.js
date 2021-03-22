const Discord = require("discord.js");
const Command = require("@Command");
module.exports = class PixelateCommand extends Command {
  constructor(client) {
    super(client, {
      name: "pixelate",
      cooldown: 5,
      description: "Shows a pixelated version of someone's avatar!",
    });
  }
  async run(message, args) {
    const canvacord = require("canvacord");
    let person =
      message.mentions.users.first() ||
      (await message.client.users.fetch(args[0]).catch((e) => {})) ||
      message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await canvacord.Canvas.pixelate(avatar);
    const embed = new Discord.MessageEmbed()
      .setTitle("P i x e l a t e d")
      .setDescription(`${person.toString()} in Minecraft:`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply(embed);
  }
};
