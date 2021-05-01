const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const ghostPingSchema = new mongoose.Schema({
  _id: reqString,
  channelId: reqString,
});

const name = "ghost-ping-channels";

module.exports = mongoose.model[name] || mongoose.model(name, ghostPingSchema);
