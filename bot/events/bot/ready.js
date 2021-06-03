const mongoose = require("mongoose");
const config = require("@config");
const message = require("./message");
module.exports = {
  name: "ready",
  once: true,
  run: async (client) => {
    const slashs = client.commands.filter((cmd) => cmd.slash.isSlash);
    let slashies = [];
    slashs.forEach((slash) => {
      let cmd = {
        name: slash.slash.name.toLowerCase(),
        description: slash.description,
      };
      let options = [];
      if (slash.slash.options)
        slash.slash.options.forEach((opt) => {
          let option = opt;
          option.name = opt.name.toLowerCase();
          options.push(option);
        });
      slash.slash.options ? (cmd.options = options) : undefined;
      slashies.push(cmd);
    });
    slashies = slashies.filter((x) => x.name && typeof x.name === "string");
    await client.application?.commands.set(slashies);
    client.giveawaysManager._init();
    const userModels = await client.schemas.user.find({});
    userModels.forEach((x) => client.db.users.cache.set(x.id, x));
    for (const guild of client.guilds.cache.values()) {
      try {
        let data = await client.db.guilds.fetch(guild.id);
        if (!data)
          data = await new client.schemas.guild({
            id: guild.id,
            name: guild.name,
            suggestions: {},
          }).save();
        client.db.guilds.cache.set(guild.id, data);
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
