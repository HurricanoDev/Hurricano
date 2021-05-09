const { model, Schema } = require("mongoose");

module.exports = model(
  "schedule",
  new Schema({
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    guildId: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
  })
);
