import BaseEvent from "../../structures/internal/BaseEvent.js";
export default (class InteractionEvent extends BaseEvent {
    constructor(client) {
        super("interaction", {
            description: "Interaction event, meant for slash commands as of now.",
            client,
        });
    }
    async run(interaction, client) {
        if (!interaction.isCommand())
            return;
        const command = client.commands
            .filter((cmd) => cmd.slashisSlash)
            .get(interaction.commandName);
        if (!command)
            return;
        const args = interaction.options.first(interaction.options.size);
        command.slash.run(interaction, args);
    }
});
