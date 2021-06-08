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
    prefixes: {
      type: Array,
      default: ["hr!"],
    },
    disabledModules: {
      type: Array,
      default: ["levelling"],
    },
    tags: {
      type: Array,
      default: null,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    disabledCommands: {
      type: Array,
      default: [],
    },
    messageLogs: {
      type: String,
      allowNull: true,
      default: null,
    },
    suggestionChannel: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
    },
    suggestions: {
      type: Schema.Types.Mixed,
      allowNull: true,
      required: false,
      default: {},
    },
    suggestionNumber: {
      type: Number,
      required: false,
      default: 1,
    },
    systemChannel: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
    },
    autoRole: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
    },
    memberLog: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    muteRole: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
    },
    antiSpam: {
      type: String,
      required: false,
      default: "off",
    },
    serverLog: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
    },
  })
);
