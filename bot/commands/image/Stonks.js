const Discord = require("discord.js"),
{ MessageAttachment } = require("discord.js");
const Command = require("@Command");
const DIG = require('discord-image-generation');
module.exports = new Command({
  name: "stonks",
  cooldown: 5,
  description: "Makes someone's avatar the stoks guy!",
  async run(message, args) {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.author;
    let avatar
    if (user.id === message.author.id) {
      avatar = user.displayAvatarURL({ format: 'jpg', size: 128 });
    } else { avatar = user.user.displayAvatarURL({ format: 'jpg', size: 128 }) }
    let img = await new DIG.Stonk().getImage(avatar)
    let attach = new MessageAttachment(img, 'stonks.png');;
    message.channel.send(attach)
  },
});
