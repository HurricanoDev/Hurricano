const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildCreate",
  run: async (guild, client) => {
    try {
      const data = await client.db.guild.getInfo(guild.id);
      if (!data)
        await new client.schemas.guild({
          _id: mongoose.Types.ObjectId(),
          name: guild.name,
          id: guild.id,
        }).save();
    } catch (err) {
      client.logger.warn(err);
    }
    const progressChannel = client.channels.cache.get("839034066795364353");
    if (!progressChannel) console.log("No progress channel found!");
    const guildEmbed = new MessageEmbed()
      .setTitle("New Guild!")
      .setImage(guild.iconURL)
      .addField("Name:", `${guild.name}`)
      .addField("Owner:", `${guild.owner}`)
      .addField("Server Count", `${client.guilds.cache.size} servers.`)
      .setColor("#6082b6");
    progressChannel.send(guildEmbed);
  },
};
