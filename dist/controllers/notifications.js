"use strict";
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
const express_1 = __importDefault(require("express"));
const UserNotifications_1 = __importDefault(require("../models/UserNotifications"));
const NotificationTokens_1 = __importDefault(require("../models/NotificationTokens"));
const notificationRouter = express_1.default.Router();
notificationRouter.patch("/seen/:notificationId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        // @ts-ignore
        const userId = req.user._id;
        yield UserNotifications_1.default.updateOne({ userId, notificationId }, { $set: { seen: true, seenAt: new Date() } });
        res.send();
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
notificationRouter.post("/subscription-change", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, isSubscribed } = req.body;
        // currently only logic for subscription
        // TODO: implement unsubscribe
        if (!isSubscribed) {
            return;
        }
        // @ts-ignore
        const userId = req.user._id;
        yield NotificationTokens_1.default.create({ userId, token });
        res.send();
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = notificationRouter;
//# sourceMappingURL=notifications.js.map