const Discord = require("discord.js");
const Command = require("@Command");

module.exports = class TriggerCommand extends Command {
  constructor(client) {
    super(client, {
      name: "trigger",
      cooldown: 5,
      description: "Shows a triggered version of someone's avatar!",
    });
  }
  async run(message, args) {
    const canvacord = require("canvacord");
    let person =
      message.mentions.users.first() ||
      (await message.client.users.fetch(args[0]).catch((e) => {})) ||
      message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await canvacord.Canvas.trigger(avatar);
    const embed = new Discord.MessageEmbed()
      .setTitle("Triggered!")
      .setDescription(`${person} is so triggered.`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply(embed);
  }
};
