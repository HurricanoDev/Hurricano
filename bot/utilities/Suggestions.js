const { MessageEmbed } = require("discord.js");

const statusMessages = {
  WAITING: {
    text: "📊 Waiting for community feedback, please vote!",
    color: 0xffea00,
  },
  ACCEPTED: {
    text: "✅ Accepted idea! Will be implemented soon!",
    color: 0x34eb5b,
  },
  DENIED: {
    text: "❌ Thank you for the feedback, but we are not interested at the moment.",
    color: 0xc20808,
  },
};

const fetchSuggestionChannel = async (guildId) => {
  let guildSchema = client.db.guilds.cache.get(guildId);
  if (!guildSchema)
    throw new Error(
      "Invalid guild ID provided for getting suggestion channel.",
    );
  if (
    !guildSchema.suggestionChannel ||
    guildSchema.suggestionChannel === "null"
  )
    return null;
  return await client.channels
    .fetch(guildSchema.suggestionChannel)
    .catch(() => {});
};
module.exports.fetchSuggestionChannel = fetchSuggestionChannel;
