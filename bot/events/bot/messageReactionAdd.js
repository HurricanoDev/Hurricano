const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  run: async (reaction, user) => {
    if (reaction.emoji.name !== "⭐") return;
    if (user.bot) return;
    var guildData = await reaction.message.guild.db.fetch();
    if (!guildData.starBoard.channel) return;
    const starBoardChannel = await client.channels
      .fetch(guildData.starBoard.channel)
      .catch(() => {});
    if (!starBoardChannel) {
      guildData.starBoard.channel = null;
      const data = await guildData.save();
      client.db.guilds.cache.set(reaction.message.guild.id, data);
      return;
    }
    if (
      !starBoardChannel
        .permissionsFor(reaction.message.guild.me)
        .has(["SEND_MESSAGES", "READ_MESSAGE_HISTORY"])
    )
      return;
    const starBoardMsgId = guildData.starBoard.messages.find(
      (x) => x[0] == reaction.message.id
    );
    const sentMessage = starBoardMsgId
      ? await starBoardChannel.messages
          .fetch(starBoardMsgId[1])
          .catch(() => {})
      : null;
    if (!sentMessage && starBoardMsgId) {
      let arrayToDelete = guildData.starBoard.messages.filter(
        (x) => x == starBoardMsgId
      );
      arrayToDelete = arrayToDelete.filter((x) => x !== starBoardMsgId);
      guildData.starBoard.messages = arrayToDelete;
      const DeletedGuildDataSave = await guildData.save();
      client.db.guilds.cache.set(
        reaction.message.guild.id,
        DeletedGuildDataSave
      );
      guildData = DeletedGuildDataSave;
    }
    if (!sentMessage && reaction.count < guildData.starBoard.minimumReactions)
      return;
    if (sentMessage) {
      return sentMessage.edit({ content: `${reaction.count} - ⭐`, embed: sentMessage.embeds[0] });
    } else {
      const embed = new MessageEmbed()
        .setAuthor(
          reaction.message.author.tag,
          reaction.message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`${reaction.message}`)
        .addField("URL:", reaction.message.url, true)
        .setColor("YELLOW")
        .setFooter(reaction.message.id)
        .setTimestamp();
      const msg = await starBoardChannel.send(`${reaction.count} - ⭐`, embed);
      let arrayToSave = guildData.starBoard;
      arrayToSave.messages.push([reaction.message.id, msg.id]);
      guildData.starBoard = arrayToSave;
      await guildData.save();
    }
  },
};
