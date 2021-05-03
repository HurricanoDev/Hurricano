const { model, Schema } = require("mongoose");

module.exports = model(
  "giveaway",
  new Schema({
    messageID: String,
    channelID: String,
    guildID: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: Number,
    prize: String,
    extraData: {
      role: String,
    },
    messages: {
      giveaway: String,
      giveawayEnded: String,
      inviteToParticipate: String,
      timeRemaining: String,
      winMessage: String,
      embedFooter: String,
      noWinner: String,
      winners: String,
      endedAt: String,
      hostedBy: String,
      units: {
        seconds: String,
        minutes: String,
        hours: String,
        days: String,
        pluralS: Boolean,
      },
    },
    hostedBy: String,
    winnerIDs: [],
    reaction: String,
    botsCanWin: Boolean,
    embedColor: String,
    embedColorEnd: String,
    exemptPermissions: [],
    extraData: {},
  })
);
