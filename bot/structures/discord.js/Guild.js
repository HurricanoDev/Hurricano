module.exports = {
  name: "Guild",
  extend(Guild) {
    Object.defineProperties(Guild, {
      db: {
        value: {
          async fetch() {
            const data = client.schemas.guild.findOne({ id: this.id });
            console.log(this);
            client.db.guilds.cache.set(this.id, data);
            return data;
          },
          cache() {
            return client.db.guilds.cache.get(this.id);
          },
        },
      },
    });
  },
};
