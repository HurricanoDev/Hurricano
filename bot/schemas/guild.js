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
      default: "null",
    },
    suggestions: {
      type: Schema.Types.Mixed,
      required: false,
      default: {},
    },
    suggestionNumber: {
      type: String,
      required: false,
      default: "1",
    },
    systemChannel: {
      type: String,
      required: false,
      default: "null",
    },
    autoRole: {
      type: String,
      required: false,
      default: "null",
    },
    memberLog: {
      type: String,
      required: false,
      default: "null",
    },
  })
);
