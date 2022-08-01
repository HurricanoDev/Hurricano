
module.exports = ({ merge }) =>
	merge({
		db: {
			cache() {
				return client.db.guilds.cache.get(this.id);
			},
			async fetch() {
				const data = await client.schemas.guild.findOne({
					id: this.id,
				});
				client.db.guilds.cache.set(this.id, data);
				return data;
			},
		},
	});
