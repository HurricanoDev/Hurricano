const { MessageEmbed } = require("discord.js");
const {
  fetchSuggestionChannel,
} = require("@root/bot/utilities/Suggestions.js");
const Command = require("@Command");
module.exports = new Command({
  name: "suggestionchannel",
  aliases: ["suggestionschannel"],
  userPermissions: ["ADMINISTRATOR"],
  cooldown: 20,
  description: "Set/remove your server's custom suggestion channel.",
  async run(message, args) {
    let prefix = message._usedPrefix;
    if (!args.length)
      return message.sendErrorReply(
        "Invalid Arguments.",
        `Please provide whether you would like to set a channel, or remove it! \n To set a suggestions channel, type: \`\`\`xl\n${prefix}suggestionchannel set {channel}\`\`\`, and if you would like to remove a suggestions channel, type \`\`\`js\n${prefix}suggestionchannel remove\`\`\``
      );
    let suggestionChannel = await fetchSuggestionChannel(message.guild.id);
    switch (args[0]) {
      case "set":
        const channel = await client.functions.getChannel(
          false,
          message,
          args[1]
        );
        if (!channel)
          return message.channel.sendError(
            message,
            "Invalid Channel Provided!",
            "You have not provided a valid channel. Please provide a valid channel."
          );
        if (suggestionChannel)
          return message.channel.sendError(
            message,
            "Suggestions Channel Already Set!",
            `A suggestions channel has already been set! You can use \`${prefix}suggestionchannel remove\` to remove it.`
          );
        var data = await client.schemas.guild.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            suggestionChannel: channel.id,
          }
        );
        console.log(data);
        message.sendSuccessReply(
          "Success!",
          "Successfully set that channel as the suggestions channel!"
        );
        break;
      case "remove":
        if (!suggestionChannel)
          return message.channel.sendErrorReply(
            message,
            "No Suggestions Channel Found!",
            `No suggestion channel was found! If you want to set one, you can use: \`${prefix}suggestionchannel set {channel}\`.`
          );
        var data = await client.schemas.guild.findOneAndUpdate(
          {
            id: message.guild.id,
          },
          {
            suggestionChannel: null,
          }
        );
        await message.channel.sendSuccess(
          message,
          "Success!",
          "Successfully removed the suggestions channel!"
        );
        break;
      default:
        return message.sendErrorReply(
          "Invalid Arguments.",
          `Please provide whether you would like to set a channel, or remove it! \n To set a suggestions channel, type: \`\`\`xl\n${prefix}suggestionchannel set {channel}\`\`\`, and if you would like to remove a suggestions channel, type \`\`\`js\n${prefix}suggestionchannel remove\`\`\``
        );
    }
  },
});
