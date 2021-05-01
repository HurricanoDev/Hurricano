const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
const ghostPingSchema = require("../../schemas/ghostping.js");

module.exports = new Command({
  name: "ghostping",
  aliases: ["gp", "setghostpingchannel"],
  userPermissions: ["ADMINISTRATOR"],
  args: "Please tag a channel!",
  cooldown: 20,
  description: "Set your server's custom prefix!",
  async run(message, args, quicksend) {
    const { mentions, guild } = message;

    const targetChannel = mentions.channels.first();

    await ghostPingSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: targetChannel.id,
      },
      {
        upsert: true,
      }
    );

    message.sendSuccessReply("Success!", `The ghost ping channel has been set to <#${targetChannel.id}>`);
  },
});
