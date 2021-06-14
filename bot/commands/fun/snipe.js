const Command = require("@Command"), Discord = require("discord.js"), { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "snipe",
  description: "Snipe a deleted message.",
  ownerOnly: true,
  async run(message, args) {
    function snipeEmbed(messageSnipe) {
      const embed = new MessageEmbed()
      .setAuthor("Sniped!", messageSnipe.author.displayAvatarURL())
      .setTitle("Content:")
      .setDescription(messageSnipe.content)
      messageSnipe.action ? embed.addField("Action:", `**\`${messageSnipe.action}.\`**`, true) : null;
      embed.addField("Action By:", `${messageSnipe.author}, \n ID: ${messageSnipe.author.id}`, true)
      messageSnipe.attachments ? embed.addField("Attachments:", messageSnipe.attachments.join(", \n"), true) : null;
      return embed;
    }
    if (!args.length) {
      const array = client.snipes.recent.get(message.channel.id);
      if (!array) return message.channel.sendError(message, "Nothing to Snipe!", `There's nothing to snipe, ${message.author}!`);
      const messageSnipe = array[0];
      const embed = snipeEmbed(messageSnipe);
      message.channel.send(embed);
    }
    const number = +args[0];
    if (number) {
      const array = client.snipes.recent.get(message.channel.id);
      if (!array) return message.channel.sendError(message, "Nothing to Snipe!", `There's nothing to snipe, ${message.author}!`);
      if (array?.length < number) return message.channel.sendError(message, "Invalid Number!", `There's only \`${array.length}\` messages I can snipe!`);
      const messageSnipe = array[number - 1];
      const embed = snipeEmbed(messageSnipe);
      message.channel.send(embed);
    }
    const num = +args[1] - 1;
    switch(args[0]) {
    case "delete":
    const msgs = this.client.snipes.deleted.get(message.channel.id);
    if (!msgs) return message.channel.sendError(message, "Nothing to Snipe!", `There's nothing to snipe, ${message.author}!`);
    if (msgs?.length < num) return message.channel.sendError(message, "Invalid Number!", `There's only \`${array.length}\` messages I can snipe!`);
    const msg = args[1] ? msgs[num] : msgs[0];
      const embed = snipeEmbed(msg);
    return message.channel.send(embed);
  break;
  case "edit":
    const msgsE = this.client.snipes.deleted.get(message.channel.id);
    if (msgsE?.length < num) return message.channel.sendError(message, "Invalid Number!", `There's only \`${array.length}\` messages I can snipe!`);
    const msgE = args[1] ? msgsE[num] : msgsE[0];
    const embedE = snipeEmbed(msgE);
    return message.channel.send(embedE);
  }}
});
