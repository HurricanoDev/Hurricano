const { MessageEmbed } = require("discord.js");
const Suggestions = require("@Utils/Suggestions.js");
const Command = require("@Command");
module.exports = new Command({
  name: "deny",
  userPermissions: ["ADMINISTRATOR"],
  args: "Please provide which suggestion you would like to decline!",
  cooldown: 20,
  description: "Decline a suggestion!",
  async run(message, args) {
    const suggestionChannel = await Suggestions.fetchSuggestionChannel(
      message.guild.id
    );
    if (!suggestionChannel)
      return message.channel.sendError(
        message,
        "No Suggestions Channel!",
        "This guild does not have a suggestions channel set! Ask an administrator to set it up."
      );
    const guildSchema = await client.schemas.guild.findOne({
      id: message.guild.id,
    });
    let suggestions = guildSchema.suggestions;
    let suggestion = suggestions[args[0]];
    if (!suggestion)
      return message.channel.sendError(
        message,
        "Invalid Suggestion ID!",
        "Please provide a valid suggestion ID!"
      );
    let suggestionMsg = await suggestionChannel.messages.fetch(suggestion[0]);
    let suggestionUser = client.users.cache.get(suggestion[1]);
    let embed = new MessageEmbed()
      .setAuthor("Suggestion Denied.", client.links.errorImage)
      .setDescription(
        "Thank you for the feedback, but we are not interested at the moment."
      )
      .addField(
        `Suggestion from \`${suggestionUser.tag}\`:`,
        suggestion[2].length > 1024
          ? "Suggestion content is larger than 1024."
          : suggestion[2],
        true
      )
      .addField("Denied By:", message.author.tag + ` (${message.author.id})`);
    await suggestionMsg.edit(embed);

    await message.channel.sendSuccess(
      message,
      "Success!",
      `Successfully denied [this suggestion!](${suggestionMsg.url})`
    );
  },
});
