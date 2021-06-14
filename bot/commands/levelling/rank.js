const Command = require("@Command");

module.exports = new Command({
  name: "rank",
  description: "Check your rank in a server!",
  async run(message, args) {
    let target = null;
    if (args[0]) {
      target =
        message.mentions.users.first() ||
        (await message.guild.members.fetch(args[0]).catch((e) => {}));
    } else {
      target = message.author;
    }

    const user = await client.levels.fetch(target.id, message.guild.id);

    if (!user) return message.channel.send("The provided user has no xp.");
    const { MessageEmbed } = require("discord.js");
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle(`Rank for ${target.tag}`)
          .setDescription(`${target} us currently on ${user.level}.`)
          .setThumbnail(target.displayAvatarURL()),
      ],
    });
  },
});
