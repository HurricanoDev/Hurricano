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
    globalChatChannel: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  })
);
