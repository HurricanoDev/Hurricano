import mongoose from "mongoose";
const LevelSchema = new mongoose.Schema({
    userID: { type: String },
    guildID: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: new Date() },
});
export default mongoose.model("Levels", LevelSchema);
