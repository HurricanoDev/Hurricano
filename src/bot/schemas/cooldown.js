import mongoose from "mongoose";
const { model, Schema } = mongoose;
export default model("cooldown", new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    expiration: {
        type: Date,
        required: true,
    },
}));
