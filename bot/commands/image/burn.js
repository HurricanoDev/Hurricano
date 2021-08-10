const Discord = require("discord.js");
const Command = require("@Command");
const canvacord = require("canvacord");
const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports = new Command({
  name: "burn",
  cooldown: 5,
  slash: {
    isSlash: true,
    options: [
      {
        name: "user",
        description: "Which user's avatar you would like to burn.",
        type: 6,
        required: true,
      },
    ],
    name: "burn",
    isNormal: true,
    async run(interaction, args) {
      const canvacord = require("canvacord");
      let person = args[0].user;
      let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
      const img = await canvacord.Canvas.burn(avatar, 4);
      const embed = new MessageEmbed()
        .setTitle("B u r n .")
        .setDescription(`Get burnt, ${person}.`)
        .setImage("attachment://img.png");
      await interaction.reply({
        embeds: [embed],
        files: [new MessageAttachment(img, "img.png")],
      });
    },
  },
  description: "Burn someone's avatar :(",
  async run(message, args) {
    let person = (await client.utils.getMember(true, message, args[0]))
      .user;
    let avatar = person.displayAvatarURL({
      dynamic: false,
      format: "png",
      size: 1024,
    });
    const img = await canvacord.Canvas.burn(avatar, 4);
    const embed = new Discord.MessageEmbed()
      .setAuthor("B u r n .", message.author.displayAvatarURL())
      .setDescription(`Get burnt, ${person}.`)
      .setImage("attachment://img.png");
    message.reply({
      embeds: [embed],
      files: [new MessageAttachment(img, "img.png")],
    });
  },
});
