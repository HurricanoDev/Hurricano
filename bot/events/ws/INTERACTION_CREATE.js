module.exports = {
    name: "INTERACTION_CREATE",
    run: async (interaction, client) => {
        const slashs = global.client.commands.filter(x => x.slash)
        const cmd = slashs.get(interaction.data.name.toLowerCase())
        if (cmd)
            cmd.run(interaction, interaction.data.options);
  }
};