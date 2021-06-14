const mongoose = require("mongoose");
const config = require("@config");
const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../../structures/BaseEvent.js");
module.exports = class guildCreateEvent extends BaseEvent {
  constructor(client) {
    super("guildCreate", { 
      description: "guildCreate event, meant for saving guilds to db, and server log.",
      client: client
    })
  }
  async run (guild, client) {
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
    const progressChannel = client.channels.cache.get(
      config.botChannels.serverJoinChannel
    );
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
  }
};
