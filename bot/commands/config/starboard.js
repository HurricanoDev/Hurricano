const Command = require("@Command");

module.exports = new Command({
  name: "starboard",
  userPermissions: ["ADMINISTRATOR"],
  description: "Set/remove the starboard channel in your server.",
  async run(message, args) {
    const guildData = client.db.guilds.cache.get(message.guild.id);
    const guildPrefix = `${guildData.prefix}`;
    const optionsEmbed = client.functions.createOptionsEmbed(
      "Starboard",
      "starboard",
      "None",
      "ADMINISTRATOR",
      "`set` Set a starboard channel\n`remove` Remove the current starboard channel",
      `${guildPrefix}`
    );

    if (!args.length) return message.channel.send(optionsEmbed);

    switch (args[0].toLowerCase()) {
      case "set":
        const SBChannel =
          message.mentions.channels.first() ||
          message.guild.channels.cache.get(args[1]);

        if (!SBChannel)
          return message.sendError(
            "Error",
            "You need to give me a valid channel!"
          );

        const updateSBChannel = await client.schemas.guild.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            starBoard: SBChannel.id,
          }
        );
        client.db.guilds.cache.set(message.guild.id, updateSBChannel);

        message.channel.sendSuccess(
          message,
          "Done!",
          `The \`starboard\` channel was set => ${SBChannel}`
        );
        break;
      case "remove":
        if (!guildData.starBoard)
          return message.sendError(
            "Error!",
            "There is no existing starboard channel to remove!"
          );

        const removeSBChannel = await client.schemas.guild.findOneA(
          {
            id: message.guild.id,
          },
          {
            starBoard: null,
          }
        );
        client.db.guilds.cache.set(message.guild.id, removeSBChannel);

        message.channel.sendSuccess(
          "Done!",
          `The starboard channel was successfully removed!`
        );
        break;
    }
  },
});
