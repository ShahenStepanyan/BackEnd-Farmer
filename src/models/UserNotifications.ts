import mongoose from "mongoose";

const UserNotificationsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    notificationId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    seen: { type: Boolean, default: false },
    seenAt: { type: Date },
    createdAt: { type: Date, default: () => new Date() },
});

const UserNotifications = mongoose.model("UserNotifications", UserNotificationsSchema);

export default UserNotifications;
