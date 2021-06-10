const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "birthdate",
  aliases: ["checkbirthday", "checkbday", "birthdaycheck"],
  cooldown: 30,
  description: "Check someone's birthday",
  async run(message, args) {
    const user = (await client.functions.getMember(true, message, args[0]))
      .user;

    const userData = client.db.users.cache.get(user.id);
    if (!userData.birthday)
      return message.sendErrorReply(
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
