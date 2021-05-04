const { model, Schema } = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

module.exports = model(
  "schedule",
  new Schema({
  date: {
    type: Date,
    required: true,
  },
  content: reqString,
  guildId: reqString,
  channelId: reqString,
  })
);
