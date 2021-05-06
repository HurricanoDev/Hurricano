const { model, Schema } = require("mongoose");

module.exports = model(
  "guild",
  new Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    prefix: {
      type: String,
      default: "hr!",
    },
    disabledModules: {
      type: Array,
      default: ["levelling"],
    },
    disabledCommands: {
      type: Array,
      default: [],
    },
    messageLogs: {
      type: String,
      default: "null",
    },
    suggestionChannel: {
      type: String,
      required: false,
      default: 'null'
    },
    systemChannel: {
      type: String,
      required: false,
      default: 'null'
    }
  })
);
