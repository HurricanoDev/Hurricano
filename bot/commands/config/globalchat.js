const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "globalchat",
  aliases: ["sgc", "globalchannel"],
  description: "Set your server's global chat channel",
  args: "Possible subcommands: `set`, `remove`",
  async run(message, args) {
    const Guild = await client.schemas.guild.findOne({ id: message.guild.id });

    switch (args[0]) {
      default:
        return message.channel.sendError(
          message,
          "Error!",
          "Invalid subcommand provided! Please provide if you would like to set a channel or remove it!"
        );
      case "set":
        let channel = await client.functions.getChannel(
          false,
          message,
          args[1]
        );
        if (!channel)
          return message.channel.sendError(
            message,
            "Invalid Channel!",
            "Invalid Channel Provided! Please provide a valid channel."
          );
        await client.schemas.guild.update({
          id: message.guild.id
        }, {
           globalChatChannel: channel.id
        });
        break;
      case "remove":
        let response;
        const permissionEmbed = new MessageEmbed()
          .setTitle("Would you like to delete the global chat channel?")
          .setDescription(
            "If you would like to delete the server's global chat channel, please respond with `yes`, and if not, please respond with `no`. You have 20 seconds."
          )
          .setFooter(`For ${message.author.tag}`);
        message.channel.send(permissionEmbed);
        await message.channel
          .awaitMessages((m) => m.author.id === message.author.id, {
            max: 1,
            time: 20000,
            errors: ["time"],
          })
          .then((collected) => {
            response = collected.first().content.toLowerCase();
          });
        if (
          (!response.includes("yes") && !response.includes("no")) ||
          (!response.includes("no") && !response.includes("yes"))
        ) {
          message.sendErrorReply(
            "Invalid Response Provided",
            "You did not provide a valid response (`yes` or `no`). I will not remove the global chat channel data."
          );
        }
        if (response.includes("yes")) {
          await message.channel.sendSuccess(
            message,
            "Removing...",
            "Removed the global chat channel for this guild."
          );
          await client.schemas.guild.findOneAndDelete(
            { id: message.guild.id },
            { globalChatChannel: null }
          );
        }
        if (response.includes("no")) {
          return message.channel.sendSuccess(
            message,
            "Global Chat Removal Cancelled",
            "Will not remove the global chat data for this guild!"
          );
        }
        break;
    }
  },
});
