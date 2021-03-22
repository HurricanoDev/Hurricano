const Discord = require("discord.js");
const Command = require("@Command");
module.exports = class RainbowCommand extends Command {
  constructor(client) {
    super(client, {
      name: "rainbow",
      cooldown: 5,
      description: "Makes someone's avatar rainbow!",
    });
  }
  async run(message, args) {
    const canvacord = require("canvacord");
    let person =
      message.mentions.users.first() ||
      (await message.client.users.fetch(args[0]).catch((e) => {})) ||
      message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await canvacord.Canvas.rainbow(avatar);
    const embed = new Discord.MessageEmbed()
      .setTitle("🌈")
      .setDescription(`${person.toString()} is a   r a i n b o w .`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply(embed);
  }
};
