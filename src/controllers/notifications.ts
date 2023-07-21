import express from "express";
import UserNotifications from "../models/UserNotifications";
import NotificationTokens from "../models/NotificationTokens";

const notificationRouter = express.Router();

notificationRouter.patch("/seen/:notificationId", async (req, res) => {
    try {
        const { notificationId } = req.params;
        // @ts-ignore
        const userId = req.user._id;
        await UserNotifications.updateOne({ userId, notificationId }, { $set: { seen: true, seenAt: new Date() } });
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

notificationRouter.post("/subscription-change", async (req, res) => {
    try {
        const { token, isSubscribed } = req.body;
        // currently only logic for subscription
        // TODO: implement unsubscribe
        if (!isSubscribed) {
            return;
        }
        // @ts-ignore
        const userId = req.user._id;
        await NotificationTokens.create({ userId, token });
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default notificationRouter;
