const fs = require("fs");
const Command = require('@Command');

module.exports = class ReloadCommand extends Command {
  constructor(client) {
    super(client, {
  name: "reload",
  description: "Reloads a command",
  args: true,
  ownerOnly: true,
    });
  };
  async run(message, args) {
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      return message.channel.send(
        `There is no command with name or alias \`${commandName}\`, ${message.author}!`
      );
    }

    const commandFolders = fs.readdirSync("./bot/commands");
    const folderName = commandFolders.find((folder) =>
      fs.readdirSync(`./bot/commands/${folder}`).includes(`${commandName}.js`)
    );

    delete require.cache[
      require.resolve(`../${folderName}/${command.name}.js`)
    ];

    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Command \`${command.name}\` was reloaded!`);
    } catch (error) {
      client.logger.warn(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
  }
};
