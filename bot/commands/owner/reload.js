const fs = require("fs");
const Command = require("@Command");

module.exports = new Command({
  name: "reload",
  description: "Reloads a command",
  args: "Please provide which command you would like to reload!",
  ownerOnly: true,
  async run(message, args) {
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.get(
        message.client.commands.aliases.get(commandName),
      );

    if (!command) {
      return message.channel.send(
        `There is no command with name or alias \`${commandName}\`, ${message.author}!`,
      );
    }
    if (command.aliases)
      command.aliases.forEach((x) => client.commands.aliases.delete(x));
    delete require.cache[
      require.resolve(`../${command.category}/${command.name}.js`)
    ];

    try {
      const newCommand = require(`../${command.category}/${command.name}.js`);
      newCommand.category = command.category;
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Command \`${command.name}\` was reloaded!`);
    } catch (error) {
      client.logger.warn(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``,
      );
    }
  },
});
