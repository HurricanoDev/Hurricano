module.exports = {
  name: "interaction",
  run: async (interaction, client) => {
    if (!interaction.isCommand()) return;
    const command = client.commands
      .filter((cmd) => cmd.slash)
      .get(interaction.commandName);
    if (!command) return;
    const args = interaction.options;
    command.slash.run(interaction, args);
  },
};
