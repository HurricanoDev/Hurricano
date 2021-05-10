const momentTimezone = require("moment-timezone");
const { MessageCollector } = require("discord.js");
const Command = require("@Command");
const scheduledSchema = require("@schemas/schedule.js");

module.exports = new Command({
  name: "schedule",
  userPermissions: ["ADMINISTRATOR"],
  args: 'Usage: <channel> <YYYY/MM/DD> <HH:MM> <"AM" or "PM"> <Timezone>',
  init: (client) => {
    const checkForPosts = async () => {
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

      setTimeout(checkForPosts, 1000 * 10);
    };

    checkForPosts();
  },
  async run (message, args) => {
    const { mentions, guild, channel } = message;

    const targetChannel = mentions.channels.first();
    if (!targetChannel) {
      message.channel.sendError(
        "Please tag a channel to send your message in."
      );
      return;
    }
    args.shift();

    const [date, time, clockType, timeZone] = args;

    if (clockType !== "AM" && clockType !== "PM") {
      message.channel.sendError(
        `You must provide either "AM" or "PM", you provided "${clockType}"`
      );
      return;
    }

    const validTimeZones = momentTimezone.tz.names();
    if (!validTimeZones.includes(timeZone)) {
      message.channel.sendError(
        "Unknown timezone! Please use one of the following: <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300>"
      );
      return;
    }

    const targetDate = momentTimezone.tz(
      `${date} ${time} ${clockType}`,
      "YYYY-MM-DD HH:mm A",
      timeZone
    );

    message.reply("Please send the message you would like to schedule.");

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
        message.channel.sendError("You did not respond in time!");
        return;
      }

      message.sendSuccessReply("Your message has been scheduled.");

      await new scheduledSchema({
        date: targetDate.valueOf(),
        content: collectedMessage.content,
        guildId: guild.id,
        channelId: targetChannel.id,
      }).save();
    });
  },
});
