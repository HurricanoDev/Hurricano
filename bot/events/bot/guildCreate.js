const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildCreate",
  run: async (guild, client) => {
    try {
      let data = await client.db.guilds.fetch(guild.id);
      if (!data)
        data = await new client.schemas.guild({
          _id: mongoose.Types.ObjectId(),
          name: guild.name,
          id: guild.id,
        }).save();
      client.db.guilds.cache.set(guild.id, data);
    } catch (err) {
      client.logger.warn(err);
    }
    const progressChannel = client.channels.cache.get(client);
    if (!progressChannel) throw new Error("No server join channel found!");
    const guildOwner = client.users.cache.get(guild.ownerID);
    client.logger.info(
      `Hurricano has joined ${guild}, with member count: ${guild.memberCount}, and owner ${guildOwner.tag}.`
    );
    const guildEmbed = new MessageEmbed()
      .setTitle("New Guild!")
      .setImage(guild.iconURL)
      .addField("Name:", `${guild.name}`)
      .addField("Owner:", `${guildOwner.tag}`)
      .addField("Server Count", `${client.guilds.cache.size} servers.`)
      .setColor("#6082b6");
    progressChannel.send(guildEmbed);
  },
};
