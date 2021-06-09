const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  run: async (reaction, user) => {
    const guildData = client.db.guilds.cache.get(reaction.message.guild.id);
    const starBoardChannel = client.channels.cache.get(guildData.starBoard);

    const handleStarBoard = async () => {
      if (
        guildData.starBoard &&
        starBoardChannel &&
        starBoardChannel
          .permissionsFor(reaction.message.guild.me)
          .has("SEND_MESSAGES")
      ) {
        const msgs = await starBoardChannel.messages.fetch({ limit: 100 });
        const sentMessage = msgs.find((msg) =>
          msg.embeds.length === 1
            ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
              ? true
              : false
            : false
        );
        if (sentMessage) {
          sentMessage.edit(`${reaction.count} - ⭐`);
        } else {
          const embed = new MessageEmbed()
            .setAuthor(
              reaction.message.author.tag,
              reaction.message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `**[Jump to the message](${reaction.message.url})**\n\nContent: ${reaction.message.content}\n`
            )
            .setColor("YELLOW")
            .setFooter(reaction.message.id)
            .setTimestamp();

          if (starBoardChannel) starBoardChannel.send(`1 - ⭐`, embed);
        }
      }
    };

    if (reaction.emoji.name === "⭐") {
      if (reaction.message.channel.id === `${guildData.starBoard}`) return;
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        handleStarBoard();
      } else handleStarBoard();
    }
  },
};
