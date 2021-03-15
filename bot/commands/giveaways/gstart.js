const ms = require("ms");
const num = require("num-parse");
const emojis = require("../../utilities/emojis.json");

module.exports = {
  name: "gstart",
  aliases: ["gs", "giveawaystart", "g-start", "giveaway", "gcreate"],
  description: "Starts a giveaway!",
  run: async (message, args) => {
    const client = message.client;
    if (
      !message.member.hasPermission("MANAGE_GUILD") &&
      !message.member.roles.cache.includes(
        (r) => r.name.toLowerCase() === "Giveaway Manager"
      )
    ) {
      return message.reply({
        embed: {
          title: "An Error Occured.",
          description:
            "Smh, you need the `MANAGE_GUILD` permission or the role `Giveaway Manager` to host a giveaway.",
          color: "#034ea2",
        },
      });
    } else if (message.author.id === this.ownerId) return true;
    const prefix = await message.client.db.guild.getPrefix(message.guild.id);
    if (
      client.giveawaysManager.giveaways.filter(
        (g) => g.guildID === message.guild.id && !g.ended
      ).length +
        1 >
      10
    )
      return message.reply({
        embed: {
          title: "An Error Occured.",
          description:
            "Maximum giveaway limit 10 reached for this server! Please try again later.",
          color: "#034ea2",
          footer: {
            text:
              "Thanks for hosting so many giveaways with this bot though ;)",
          },
        },
      });
    let time = args[0];
    if (!time)
      return message.reply({
        embed: {
          title: "An Error Occured.",
          description: `You need to mention the giveaway time as well! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
          fields: [
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
          ],
          color: "#034ea2",
          footer: {
            text:
              "How do you think I'll host a giveaway without the time given smh?",
          },
        },
      });
    if (ms(time) > ms("20d"))
      return message.reply({
        embed: {
          title: "An Error Occured.",
          description: `The giveaway duration has to be lesser than 20 days. \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
          fields: [
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
          ],
          color: "#034ea2",
        },
      });
    let winners = args[1];
    if (!winners)
      return message.reply({
        embed: {
          title: "An Error Occured.",
          description: `Please provide a valid winner count! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
          fields: [
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
          ],
          color: "#034ea2",
          footer: { text: "Imagine a giveaway without any winners-" },
        },
      });
    winners = num(winners, 1);
    if (winners > 15)
      return message.reply({
        embed: {
          title: "An Error Occured.",
          description: `The giveaway winners should be lesser than 15. \n Ex: \`${prefix}gstart 1d 8w Discord Nitro\``,
          fields: [
            {
              name: "Time Values",
              value:
                "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
            },
            {
              name: "Winner Values",
              value: "W stands for winner.",
            },
          ],
          color: "#034ea2",
        },
      });
    let prize = args.slice(2).join(" ");
    if (!prize)
      return message.reply({
        embed: {
          title: "An Error Occured.",
          description: `Please mention a valid giveaway prize! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
          fields: [
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
          ],
          color: "#034ea2",
        },
      });
    client.giveawaysManager.start(message.channel, {
      time: ms(time),
      winnerCount: winners,
      prize: prize,
      hostedBy: message.author,
      messages: {
        giveaway: `${emojis.categories.giveaways} **Giveaway** ${emojis.categories.giveaways}`,
        giveawayEnded: "🎊 **Giveaway Ended!** 🎊",
        timeRemaining: "Time left: **{duration}**!",
        inviteToParticipate: 'React with "🎉" to participate!',
        winMessage: "🎊 Congrats, {winners} for winning **{prize}**!",
        embedFooter: `${client.user.tag}`,
        noWinner: "Nobody won because of the invalid participations!",
        hostedBy: "Hosted by: {user}",
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
};
