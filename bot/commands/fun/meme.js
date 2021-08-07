const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Command = require('@Command');

module.exports = new Command({
  name: 'meme',
  userPermissions: ['SEND_MESSAGES'],
  cooldown: 20,
  description:
    'Displays a random meme from the `memes`, `dankmemes`, or `me_irl` subreddits.',
  async run(message, args) {
    try {
      let res = await fetch('https://meme-api.herokuapp.com/gimme');
      res = await res.json();
      const embed = new MessageEmbed()
        .setTitle(res.title)
        .setDescription(
          `Subreddit: [r/${res.subreddit}](https://reddit.com/r/${res.subreddit}) \n Link: ${res.postLink}`,
        )
        .setURL(res.postLink)
        .setImage(res.url)
        .setFooter(`${message.member.displayName} | 👍 ${res.ups}`)
        .setTimestamp()
        .setColor('#0099ff');
      message.reply({ embeds: [embed] });
    } catch (err) {
      message.channel.send(
        `Oops! Something went wrong. Error: \n ${err.message}`,
      );
    }
  },
});
