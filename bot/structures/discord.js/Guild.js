module.exports = {
  name: "Guild",
  extend(Guild) {
    Object.defineProperties(Guild, {
      db: {
        value: {
          async fetch() {
            const data = client.schemas.Guild.findOne({ id: this.id });
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
