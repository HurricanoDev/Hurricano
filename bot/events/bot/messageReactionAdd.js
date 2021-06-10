const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  run: async (reaction) => {
    if (reaction.emoji.name !== "⭐") return;
    let guildData = client.db.guilds.cache.get(reaction.message.guild.id);
    if (!guildData.starBoard.channel) return;
    const starBoardChannel = await client.channels
      .fetch(guildData.starBoard.channel)
      .catch(() => {});
      if (!starBoardChannel) return;
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
    const starBoardMsgId = guildData.starBoard.messages.find(x => x === reaction.message.id);
      if (reaction.message.author.bot) return;
    const sentMessage = await message.channel.messages.fetch(
      starBoardMsgId
    ).catch(() => {});
    if (!sentMessage && starBoardMsgId) {
      let arrayToDelete = guildData.starBoard.messages.filter(x => x === starBoardMsgId);
      arrayToDelete = arrayToDelete.filter(x => x !== starBoardMsgId);
      guildData.starBoard.messages = arrayToDelete;
      const DeletedGuildDataSave = await guidData.save();
      client.db.guilds.cache.set(message.guild.id, DeletedGuildDataSave);
      guildData = DeletedGuildDataSave;
    }
    if (
      !sentMessage &&
      reaction.message.reactions.cache.get("⭐").count <
        guildData.starBoard.minimumReactions
    )
      return;
    if (sentMessage) return sentMessage.edit(`${reaction.count} - ⭐`);
 else {
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
      const msg = await starBoardChannel.send(`${reaction.message.reactions.cache.size} - ⭐`, embed);
      let arrayToSave = guilData.starBoard.messages;
      arrayToSave.push(msg);
      guildData.starBoard.messages = arrayToSave;
      const dataToSave = await guildData.save();
      client.db.guilds.cache.set(dataToSave);
    }
  },
};
