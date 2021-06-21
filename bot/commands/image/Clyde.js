const Discord = require("discord.js"),
  { MessageAttachment } = require("discord.js");
const Command = require("@Command");
const fetch = require('node-fetch');
module.exports = new Command({
  name: "clyde",
  cooldown: 5,
  description: "Sends a clyde message",
  async run(message, args) {
    const text = args.slice().join(' ');
    if (!text) {
      return message.channel.send(
        '❎ Please provide valid text.',
      );
    }

    const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

    let response;
    try {
      response = await fetch(url).then(res => res.json());
    }
    catch (e) {
      return message.channel.send('❎ An error occured, please try again!');
    }
    const attachment = new MessageAttachment(response.message, 'clyde.png');
    return message.channel.send(attachment);
  },
});
