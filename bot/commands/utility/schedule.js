const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
const scheduledSchema = require("@schemas/schedule.js");
const momentTimezone = require('moment-timezone');

module.exports = new Command({
  name: "schedule",
  userPermissions: ["MANAGE_GUILD"],
  cooldown: 20,
  args: "Usage: <Channel> <YYYY/MM/DD> <HH:MM> <AM or PM> <Timezone>",
  description: "Schedule a message to be sent!",
  async run(client, message, args) {
    const postCheck = async () => {
      const query = {
        date: {
          $lte: Date.now(),
        },
      };

      const results = await scheduledSchema.find(query);

      for (const post of results) {
        const { guildId, channelId, content } = post;

        const guild = await client.guilds.fetch(guildId);
        if (!guild) {
          continue;
        }

        const channel = guild.channels.cache.get(channelId);
        if (!channel) {
          continue;
        }

        channel.send(content);
      }

      await scheduledSchema.deleteMany(query);

      setTimeout(postCheck, 1000 * 10);
    };

    postCheck();

    const { mentions, guild, channel } = message;

    const targetChannel = mentions.channels.first();
    if (!targetChannel) {
      message.channel.sendErrorReply(
        message,
        "Error",
        "Mention a channel to schedule your message in."
      );
      return;
    }

    args.shift();

    const [date, time, clockType, timeZone] = args;

    if (clockType !== "AM" && clockType !== "PM") {
      message.channel.sendErrorReply(
        message,
        "Error!",
        `You must provide either "AM" or "PM", you provided "${clockType}"`
      );
      return;
    }

    const validTimeZones = momentTimezone.tz.names();
    if (!validTimeZones.includes(timeZone)) {
      message.channel.sendErrorReply(
        message,
        "Error",
        "That was an unknown timezone! Use one of the following: <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300>"
      );
      return;
    }

    const targetDate = momentTimezone.tz(
      `${date} ${time} ${clockType}`,
      "YYYY-MM-DD HH:mm A",
      timeZone
    );

    message.channel.sendErrorReply(
      message,
      "Error",
      "Please send the message you would like to schedule."
    );

    const filter = (newMessage) => {
      return newMessage.author.id === message.author.id;
    };

    const collector = new MessageCollector(channel, filter, {
      max: 1,
      time: 1000 * 60, // 60 seconds
    });

    collector.on("end", async (collected) => {
      const collectedMessage = collected.first();

      if (!collectedMessage) {
        message.channel.sendErrorReply(
          message,
          "Error!",
          "You did not reply in time."
        );
        return;
      }

      message.channel.sendSuccessReply(
        message,
        "Done!",
        "Your message has been scheduled."
      );

      await new scheduledSchema({
        date: targetDate.valueOf(),
        content: collectedMessage.content,
        guildId: guild.id,
        channelId: targetChannel.id,
      }).save();
    });
  },
});
