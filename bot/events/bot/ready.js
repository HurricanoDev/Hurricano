const mongoose = require("mongoose");
const config = require("@config");
module.exports = {
  name: "ready",
  once: true,
  run: async (client) => {
    const slashs = client.commands.filter((cmd) => cmd.slash);
    slashs.forEach(async (x) => {
      await client.api.applications(client.user.id).commands.post({
        data: {
          name: x.name,
          description: x.description,
          options: x.options,
        },
      });
    });
    client.giveawaysManager._init();
    //find and create data
    for (const guild of client.guilds.cache.values()) {
      try {
        const data = await client.db.guild.getInfo(guild.id);
        if (!data)
          await new client.schemas.guild({
            id: guild.id,
            name: guild.name,
          }).save();
      } catch (err) {
        client.logger.warn(err);
      }
    }
    client.user.setActivity({
      name: `${client.globalPrefix}help`,
      type: "STREAMING",
      url: "https://twitch.tv/Pewdiepie",
    });
    client.logger.client(`${client.user.tag} Successfully Logged in!`);
  },
};
