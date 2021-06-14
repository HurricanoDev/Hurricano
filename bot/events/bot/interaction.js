const BaseEvent = require("../../structures/BaseEvent.js");

module.exports = class InteractionEvent extends BaseEvent {
  constructor(client) {
    super("interaction", {
      description: "Interaction event, meant for slash commands as of now.",
      client: client,
    });
  }
  async run(interaction, client) {
    if (!interaction.isCommand()) return;
    const command = client.commands
      .filter((cmd) => cmd.slash)
      .get(interaction.commandName);
    if (!command) return;
    const args = interaction.options.first(interaction.options.size);
    command.slash.run(interaction, args);
  }
};
