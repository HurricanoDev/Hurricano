const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "setsuggestionchannel",
  aliases: ["suggestionchannel"],
  userPermissions: ["ADMINISTRATOR"],
  args: "Tag a channel to set as your suggestion channel!",
  cooldown: 20,
  description: "Set your server's custom suggestion channel!",
  async run(message, args, quicksend) {
   //Working on this yyeee
  },
});
