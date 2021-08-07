const { Structures } = require('discord.js');
module.exports = Structures.extend('Guild', (Guild) => {
  class HurricanoGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.db = {
        cache: () => {
          return client.db.guilds.cache.get(this.id);
        },
        fetch: async () => {
          const data = await client.schemas.guild.findOne({ id: this.id });
          client.db.guilds.cache.set(this.id, data);
          return data;
        },
      };
    }
  }
  return HurricanoGuild;
});
