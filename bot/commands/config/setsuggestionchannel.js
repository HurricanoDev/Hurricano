const { MessageEmbed } = require("discord.js");
const { fetchSuggestionChannels } = require('../../events/bot/suggestions.js');
const Command = require("@Command");
module.exports = new Command({
  name: "setsuggestionchannel",
  aliases: ["suggestionchannel"],
  userPermissions: ["ADMINISTRATOR"],
  args: "Tag a channel to set as your suggestion channel!",
  cooldown: 20,
  description: "Set your server's custom suggestion channel!",
  async run(client, message, args, quicksend) {
   const channel = message.mentions.channels.first() || message.channel;

    const {
      guild: { id: guildId },
    } = message
    const { id: channelId } = channel

    await client.schemas.guild.findOneAndUpdate(
      {
        id: guildId,
      },
      {
        id: guildId,
        suggestionChannel: channelId,
      },
      {
        upsert: true,
      }
    )

    message.channel.sendSuccessReply(message, "Success!", `The suggestions channel has been set to ${channel}`)

    fetchSuggestionChannels(guildId)
  },
});
