const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  run: async (oldMessage, newMessage, client) => {
    if (newMessage.webhookID) return;
    if (
      newMessage.member &&
      newMessage.id === newMessage.member.lastMessageID &&
      !oldMessage.command
    ) {
      client.emit("message", newMessage);
    }
  },
};
