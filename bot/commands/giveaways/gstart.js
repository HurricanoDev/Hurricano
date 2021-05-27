const ms = require("../../utilities/ms.js");
const emojis = require("../../utilities/emojis.json");
const Command = require("@Command");
module.exports = new Command({
  name: "gstart",
  aliases: ["gs", "giveawaystart", "g-start", "giveaway", "gcreate"],
  description: "Starts a giveaway!",
  async run(message, args) {
    const client = message.client;
    if (
      !message.member.permissions.has("MANAGE_MESSAGES") &&
      !message.member.roles.cache.has(
        (r) =>
          r.name.toLowerCase() === "Giveaway Manager" &&
          !client.config.ownerIds.includes(message.author.id)
      )
    ) {
      return message.sendErrorReply(
        "An Error Occured.",
        "Smh, you need the `MANAGE_MESSAGES` permission or the role `Giveaway Manager` to host a giveaway."
      );
    }
    const prefix = await message.client.db.guilds.getPrefix(message.guild.id);
    if (
      client.giveawaysManager.giveaways.filter(
        (g) => g.guildID === message.guild.id && !g.ended
      ).length +
        1 >
      10
    )
      return message.sendErrorReply(
        "An Error Occured.",
        "Maximum giveaway limit 10 reached for this server! Please try again later.",
        "Thanks for hosting so many giveaways with this bot though ;)"
      );
    let time = args[0];
    if (!time)
      return message.sendErrorReply(
        "An Error Occured.",
        `You need to mention the giveaway time as well! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
        "How do you think I'll host a giveaway without the time given smh?",
        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );
    if (ms(time) > ms("20d"))
      return message.sendErrorReply(
        "An Error Occured.",
        `The giveaway duration has to be lesser than 20 days. \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
        "Long giveaway you have there ;-;",
        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );
    let winners = +args[1];
    if (!winners)
      return message.sendErrorReply(
        "An Error Occured.",
        `Please provide a valid winner count! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
        "Imagine a giveaway without any winners-",
        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );
    if (winners > 100)
      return message.sendErrorReply(
        "An Error Occured.",
        `The giveaway winners should be lesser than 15. \n Ex: \`${prefix}gstart 1d 8w Discord Nitro\``,
        "Big giveaway you have there ;-;",
        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
          },
          {
            name: "Winner Values",
            value: "W stands for winner.",
          },
        ]
      );
    let role = null;
    if (!args[2])
      return message.channel.sendErrorReply(
        "Invalid Arguments Provided.",
        "Please provide a required role for this giveaway, or if you want none just type none."
      );
    role =
      message.guild.roles.cache.get(args[2]) ||
      message.guild.roles.cache.find((role) => role.name == args[2]) ||
      message.guild.roles.cache.find((role) => role.name.includes(args[0])) ||
      message.mentions.roles.first();

    if (!role && !args[2].toLowerCase().startsWith("none"))
      return message.channel.sendErrorReply(
        "Invalid Required Role Provided.",
        "Please check if the role you provided exists, or if you spelled none wrong."
      );
    if (args[2].toLowerCase().startsWith("none")) {
      role = null;
    }
    let prize = args.slice(3).join(" ");
    if (!prize)
      return message.sendErrorReply(
        "An Error Occured.",
        `Please mention a valid giveaway prize! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
        "Kinda hard for me to host a giveaway without a prize ;-;",
        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );
    client.giveawaysManager.start(message.channel, {
      time: ms(time),
      winnerCount: winners,
      prize: prize,
      hostedBy: message.author,
      extraData: {
        role: role == null ? "null" : role,
      },
      messages: {
        giveaway: `${emojis.categories.giveaways} **Giveaway** ${emojis.categories.giveaways}`,
        giveawayEnded: "🎊 **Giveaway Ended!** 🎊",
        timeRemaining: "Time left: **{duration}**!",
        inviteToParticipate: 'React with "🎉" to participate!',
        winMessage: "🎊 Congrats, {winners} for winning **{prize}**!",
        embedFooter: `${client.user.tag}`,
        noWinner: "Nobody won because of the invalid participations!",
        hostedBy: `Hosted by: {user} \n ${
          role == null ? "Required Role: " + role.toString() : undefined
        }`,
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
        },
      },
    });
    if (message.deletable) message.delete();
    return;
  },
});
