"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationTokensSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users" },
    token: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
});
const NotificationTokens = mongoose_1.default.model("NotificationTokens", NotificationTokensSchema);
exports.default = NotificationTokens;
//# sourceMappingURL=NotificationTokens.js.map