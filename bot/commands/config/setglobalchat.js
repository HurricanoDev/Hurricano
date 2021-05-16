const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "setglobalchat",
  aliases: ["sgc", "setglobalchannel"],
  description: "Set your server's global chat channel",
  args: "Possible subcommands: `set`, `remove`",
  async run(message, args) {
    const Guild = await client.schemas.guild.findOne({ id: message.guild.id });

    switch (args[0]) {
      case "set":
        const setChannel =
          message.guild.channels.cache.get(args[1]) ||
          message.mentions.channels.first();
        if (!setChannel)
          return message.sendErrorReply(
            message,
            "Error",
            "Please provide a valid channel."
          );

        if (Guild.globalChatChannel !== "null") {
          await message.channel.sendSuccess(
            message,
            "Done!",
            `The global chat channel was updated from ${Guild.globalChatChannel} => ${setChannel}`
          );
          await client.schemas.guild.findOneAndUpdate(
            { id: message.guild.id },
            { globalChatChannel: setChannel.id },
            { upsert: true }
          );
        } else if (Guild.globalChatChannel == "null") {
          await message.channel.sendSuccess(
            message,
            "Done!",
            `The global chat channel was updated from \`None\` => ${setChannel}`
          );
          await client.schemas.guild.findOneAndUpdate(
            { id: message.guild.id },
            { globalChatChannel: setChannel.id },
            { upsert: true }
          );
        }
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
          await message.channel.sendSuccesss(
            message,
            "Removing...",
            "Removed the global chat channel for this guild."
          );
          setTimeout(() => {
            await client.schemas.guild.findOneAndDelete(
              { id: message.guild.id },
              { globalChatChannel: "null" }
            );
          }, 1000);
        }
        if (response.includes("no")) {
          return message.channel.sendSuccesss(
            message,
            "Global Chat Removal Cancelled",
            "Will not remove the global chat data for this guild!"
          );
        };
      break;
    }
  },
});
