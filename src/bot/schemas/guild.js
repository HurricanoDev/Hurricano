import mongoose from "mongoose";
const { model, Schema } = mongoose;
export default model("guild", new Schema({
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
        default: true,
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
    starBoard: {
        minimumReactions: {
            type: Number,
            default: 1,
        },
        messages: {
            type: Array,
            default: [],
        },
        channel: {
            type: String,
            required: false,
            allowNull: true,
            default: null,
        },
    },
    blacklistedWords: {
        type: Array,
        required: false,
        default: [],
    },
}));
