import * as OneSignal from "onesignal-node";
import Users from "../models/User";
import NotificationTokens from "../models/NotificationTokens";
import UserNotifications from "../models/UserNotifications";

import type { AnimalDocument } from "../types/Animal";

const client = new OneSignal.Client(process.env.ONE_SIGNAL_APP_ID, process.env.ONE_SIGNAL_API_KEY);

type SendNotificationParams = {
    title: string;
    content: string;
    url?: string;
    tokens: Array<string>;
};

export async function sendNotification({ title, content, url, tokens }: SendNotificationParams) {
    const notification = await client.createNotification({
        include_player_ids: tokens,
        // filters: [{ field: 'last_session', relation: '>', value: 480 }],
        contents: {
            en: content,
        },
        headings: {
            en: title,
        },
        url,
    });
    return notification.body.id;
}

type SendNotificationToUsersParams = Omit<SendNotificationParams, "tokens"> & {
    include?: Array<string>;
    exclude?: Array<string>;
};

export async function sendNotificationToUsers({ title, content, include, exclude }: SendNotificationToUsersParams) {
    const condition: any = { _id: {} };
    if (include) {
        condition._id.$in = include;
    }
    if (exclude) {
        condition._id.$nin = exclude;
    }
    const users = await Users.find(condition);
    const tokens = await NotificationTokens.distinct("token", { userId: { $in: users.map((user) => user._id) } });
    if (!tokens.length) {
        return;
    }
    const notificationId = await sendNotification({ title, content, tokens });

    const userNotifications = users.map((user) => ({
        title,
        content,
        notificationId,
        userId: user._id,
    }));
    await UserNotifications.insertMany(userNotifications);
}

type AnimalActionTypes = "created" | "deregistered" | "gotSick";

const animalNotifications: Record<AnimalActionTypes, (animal: AnimalDocument) => SendNotificationToUsersParams> = {
    created: (animal) => ({
        title: "A new animal was born!",
        content: `New animal was born:\nSerial Number ${animal.serialNumber}\nGender ${animal.gender}`,
        url: `${process.env.WEB_URL}/animal/${animal._id}`,
        // Send new animal notification to all users excluding the one who have created it
        exclude: [animal.createdBy.toString()],
    }),
    deregistered: () => ({ title: "", content: "" }),
    gotSick: () => ({ title: "", content: "" }),
};

export async function animalNotification(type: AnimalActionTypes, animal: AnimalDocument) {
    await sendNotificationToUsers(animalNotifications[type](animal));
}
