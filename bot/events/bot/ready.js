const mongoose = require("mongoose");
const config = require("@config");
module.exports = {
  name: "ready",
  once: true,
  run: async (client) => {
    //find and create data
    for (const guild of client.guilds.cache.values()) {
      try {
        const data = await client.db.guild.getInfo(guild.id);
        if (!data)
          await new client.schemas.guild({
            _id: mongoose.Types.ObjectId(),
            id: guild.id,
            name: guild.name,
          }).save();
      } catch (err) {
        client.logger.warn(err);
      }
    }
    client.user.setActivity({
      name: `${config.prefix}help`,
      type: "STREAMING",
      url: "https://twitch.tv/Pewdiepie",
    });
    client.logger.client(`${client.user.username} Successfully Logged in!`);
  },
};
