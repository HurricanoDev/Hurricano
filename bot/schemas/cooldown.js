const { model, Schema } = require("mongoose");

module.exports = model(
  "cooldown",
  new Schema({
    key: {
      type: String,
      required: true,
      unique: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
  })
);
