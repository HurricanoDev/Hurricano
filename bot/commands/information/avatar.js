const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: ["profilepic", "pic", "ava"],
      slash: true,
      double: true,
      options: [
        {
          name: "User",
          description: "Which user you would like to see the avatar of.",
          type: 6,
          required: true,
        },
      ],
      description: "Displays a user's avatar.",
    });
  }
  async run(message, args, quicksend) {
    if (message.token) {
      const guild = this.client.guilds.cache.get(message.guild_id);
      const member = await guild.members.fetch(args[0].value);
      const embed = new MessageEmbed()
        .setAuthor(
          member.displayName,
          member.user.displayAvatarURL({ dynamic: true })
        )
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setTimestamp();
      await quicksend(message, embed);
    } else {
      let member = null;
      if (args[0]) {
        member =
          message.mentions.users.first() ||
          (await message.guild.members.fetch(args[0]).catch((e) => {}));
      } else {
        member = message.author;
      }
      const embed = new MessageEmbed()
        .setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
        .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setTimestamp();
      await message.channel.send(embed);
    }
  }
};
