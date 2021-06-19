const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const config = require("@config");
const Command = require("@Command");

module.exports = new Command({
  name: "eject",
  userPermissions: ["SEND_MESSAGES"],
  cooldown: 20,
  description: "sends an among us eject image in the chat.",
  async run(message, args) {
    const imp = [true, false];
    const imposter = imp[Math.floor(Math.random() * imp.length)];
    const crew = [
      "black",
      "blue",
      "brown",
      "cyan",
      "darkgreen",
      "lime",
      "orange",
      "pink",
      "purple",
      "red",
      "white",
      "yellow",
    ];
    const crewmate = crew[Math.floor(Math.random() * crew.length)];
    //get pinged user, if not then use cmd user
    try {
      let member = message.mentions.users.first();
      if ((member = message.author))
        return message.reply("You can't eject yourself");
      if (!member) return message.reply("Who do you wanna eject?");
      const data = await fetch(
        `https://vacefron.nl/api//ejected?name=${member.username}&impostor=${imposter}&crewmate=${crewmate}`
      );
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(
          `${message.author.username} decided to eject ${member.username}`
        )
        .setImage(`${data.url}`);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.channel.sendError(
        message,
        "Something went wrong.",
        `\`\`\`${err.stack}\`\`\` \n Note: The eject command won't work if the username provided has cancerous characters.`
      );
    }
  },
});
