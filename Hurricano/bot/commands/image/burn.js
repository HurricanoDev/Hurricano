const Discord = require("discord.js");
const Command = require("@Command");
const canvacord = require("canvacord");
const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports = new Command({
  name: "burn",
  cooldown: 5,
  slash: true,
  double: true,
  description: "Burn someone's avatar :(",
  options: [
    {
      name: "User",
      description: "Which user's avatar you would like to burn.",
      type: 6,
      required: true,
    },
  ],
  async run(message, args, quicksend) {
    if (message.token) {
      const canvacord = require("canvacord");
      let person = await client.users.fetch(args[0].value);
      let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
      const img = await canvacord.Canvas.burn(avatar, 4);
      const embed = new MessageEmbed()
        .setTitle("B u r n .")
        .setDescription(`Get burnt, ${person}.`)
        .attachFiles([new MessageAttachment(img, "img.png")])
        .setImage("attachment://img.png");
      quicksend(message, embed);
    } else {
      let person =
        message.mentions.users.first() ||
        (await message.client.users.fetch(args[0]).catch((e) => {})) ||
        message.author;
      let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
      const img = await canvacord.Canvas.burn(avatar, 4);
      const embed = new Discord.MessageEmbed()
        .setTitle("B u r n .")
        .setDescription(`Get burnt, ${person}.`)
        .attachFiles([new MessageAttachment(img, "img.png")])
        .setImage("attachment://img.png");
      message.reply(embed);
    }
  },
});
