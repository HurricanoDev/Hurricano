const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "birthdaycheck",
  aliases: ["checkbirthday", "checkbday"],
  cooldown: 30,
  description: "Check someone's birthday",
  async run(message, args) {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;

    const userData = client.schemas.user.findOne({ id: user.id });
    if (!userData.birthday)
      return message.sendError(
        "Error",
        "Sorry! That person hasn't set their birthday yet."
      );

    const birthdayEmbed = new MessageEmbed()
      .setTitle("Results:")
      .setColor("RANDOM")
      .setDescription(
        `${user.username}'s birthdate is **${userData.birthday}**`
      );

    message.channel.send(birthdayEmbed);
  },
});
