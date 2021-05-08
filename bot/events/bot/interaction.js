module.exports = {
  name: "interaction",
  run: async (interaction, client) => {
    if (!interaction.isCommand()) return;
    console.log(interaction);
    const command = client.commands
      .filter((cmd) => cmd.slash)
      .get(interaction.commandName);
    if (!command) return;
    command.run(interaction);
  },
};
