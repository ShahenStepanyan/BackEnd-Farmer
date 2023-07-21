import mongoose from "mongoose";

const NotificationTokensSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    token: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
});

const NotificationTokens = mongoose.model("NotificationTokens", NotificationTokensSchema);

export default NotificationTokens;
