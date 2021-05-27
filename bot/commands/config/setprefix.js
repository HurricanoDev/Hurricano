const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
const embed = new MessageEmbed().setAuthor(
  "Server Settings Change.",
  "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
);

module.exports = new Command({
  name: "setprefix",
  aliases: ["sp", "setp"],
  userPermissions: ["ADMINISTRATOR"],
  args: "Please mention what you would like to set as your prefix!",
  cooldown: 20,
  description: "Set your server's custom prefix!",
  slash: {
    name: "setprefix",
    isSlash: true,
    options: [
      {
        name: "prefix",
        description: "What you would you like to set your prefix as.",
        type: 3,
        required: true,
      },
    ],
    isNormal: true,
    async run(interaction, args) {
      const prefix = args[0].value;
      if (
        !interaction.channel
          .permissionsFor(interaction.user.id)
          .has("ADMINISTRATOR")
      )
        return await interaction.reply(
          "You don't have `ADMINISTRATOR` permission to do this!",
          { ephemeral: true }
        );
      await client.db.guilds.updatePrefix(interaction.guild.id, prefix);

      embed.setDescription(
        "The server prefix has now been changed to **`" + prefix + "`**."
      );
      await interaction.reply(embed, { ephemeral: true });
    },
  },
  async run(message, args) {
    const prefix = args[0];

    await message.client.db.guilds.updatePrefix(message.guild.id, prefix);

    message.sendSuccessReply(
      "Server Settings Change.",
      "The server prefix has now been changed to **`" + prefix + "`**."
    );
  },
});
