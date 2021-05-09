const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "avatar",
  aliases: ["profilepic", "pic", "ava", "pfp"],
  args: "Please provide who's avatar you would like to see!",
  slash: {
    name: "avatar",
    isSlash: true,
    options: [
      {
        name: "user",
        description: "Which user you would like to see the avatar of.",
        type: 6,
        required: true,
      },
    ],
    description: "Display a user's avatar.",
    async run(interaction, args) {
      const member = args[0].user;
      const embed = new MessageEmbed()
        .setAuthor(
          member.displayName,
          member.displayAvatarURL({ dynamic: true })
        )
        .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setTimestamp();
      await interaction.reply(embed);
    },
  },
  description: "Displays a user's avatar.",
  async run(message, args) {
      const member = (await client.functions.getMember(true, message, args))
        .user;
      const embed = new MessageEmbed()
        .setAuthor(
          member.displayName,
          member.displayAvatarURL({ dynamic: true })
        )
        .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setTimestamp();
    await message.channel.send(embed);
  },
});
