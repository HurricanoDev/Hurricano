import mongoose from "mongoose";
const { model, Schema } = mongoose;
export default model("user", new Schema({
    name: {
        type: String,
        required: false,
    },
    id: {
        type: String,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Array,
        default: [],
    },
    wallet: {
        type: Number,
        default: 0,
    },
    job: {
        type: String,
        default: "none",
    },
    bank: {
        type: Number,
        default: 0,
    },
    cooldowns: {
        type: Object,
        default: {},
    },
    birthday: {
        type: String,
        allowNull: true,
        default: null,
    },
    voteReminder: {
        type: Boolean,
        default: false,
    },
}));
