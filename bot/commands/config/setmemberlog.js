const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "setmemberlog",
  aliases: ["setmemberlogchannel", "smemberlog"],
  userPermissions: ["ADMINISTRATOR"],
  cooldown: 15,
  description: "Set a channel to log in when members leave/join.",
  async run(message, args) {
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) {
      return await message.channel.sendError(
        message,
        "Error",
        `Provide a \`valid\` channel/ID to set as the server's memberlog-channel.`
      );
    } else {
      let data = client.db.guilds.cache.get(message.guild.id);
      const currentChannel = data.memberLog;
      if (data.memberLog) {
        data = await client.schemas.guild.findOneAndUpdate(
          { id: message.guild.id },
          { memberLog: channel.id },
          { upsert: true }
        );
        return message.sendSuccessReply(
          "Memberlog Updated!",
          `The guild's memberlog channel was updated from \`None\` ➔ <#${channel.id}>`
        );
      } else if (data.memberLog) {
        data = await client.schemas.guild.findOneAndUpdate(
          { id: message.guild.id },
          { memberLog: channel.id },
          { upsert: true }
        );
        return message.sendSuccessReply(
          "Memberlog Updated!",
          `The guild's memberlog channel was updated from <#${currentChannel}> ➔ <#${channel.id}>`
        );
      }
    }
  },
});
