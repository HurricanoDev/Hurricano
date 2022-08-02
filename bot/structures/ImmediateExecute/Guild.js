module.exports = ({ merge }) =>
	merge({
		get db() {
			return {
				cache: () => {
					return client.db.guilds.cache.get(this.id);
				},
				fetch: async () => {
					const data = await client.schemas.guild.findOne({
						id: this.id,
					});

					client.db.guilds.cache.set(this.id, data);

					return data;
				},
			};
		},
	});
