"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalNotification = exports.sendNotificationToUsers = exports.sendNotification = void 0;
const OneSignal = __importStar(require("onesignal-node"));
const User_1 = __importDefault(require("../models/User"));
const NotificationTokens_1 = __importDefault(require("../models/NotificationTokens"));
const UserNotifications_1 = __importDefault(require("../models/UserNotifications"));
const client = new OneSignal.Client(process.env.ONE_SIGNAL_APP_ID, process.env.ONE_SIGNAL_API_KEY);
function sendNotification({ title, content, url, tokens }) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = yield client.createNotification({
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
    });
}
exports.sendNotification = sendNotification;
function sendNotificationToUsers({ title, content, include, exclude }) {
    return __awaiter(this, void 0, void 0, function* () {
        const condition = { _id: {} };
        if (include) {
            condition._id.$in = include;
        }
        if (exclude) {
            condition._id.$nin = exclude;
        }
        const users = yield User_1.default.find(condition);
        const tokens = yield NotificationTokens_1.default.distinct("token", { userId: { $in: users.map((user) => user._id) } });
        if (!tokens.length) {
            return;
        }
        const notificationId = yield sendNotification({ title, content, tokens });
        const userNotifications = users.map((user) => ({
            title,
            content,
            notificationId,
            userId: user._id,
        }));
        yield UserNotifications_1.default.insertMany(userNotifications);
    });
}
exports.sendNotificationToUsers = sendNotificationToUsers;
const animalNotifications = {
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
function animalNotification(type, animal) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendNotificationToUsers(animalNotifications[type](animal));
    });
}
exports.animalNotification = animalNotification;
//# sourceMappingURL=notification.js.map