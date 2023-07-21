"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const SpendingsListSchema = new mongoose_1.default.Schema(Object.assign({ amount: {
        type: String,
        required: [false, "Amount is required"],
        unique: true,
    }, date: {
        type: String,
        required: [false, "Date is required"],
        unique: true,
    }, type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [false, "Date is required"],
        unique: true,
    } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(SpendingsListSchema);
const SpendingsType = mongoose_1.default.model("spendings", SpendingsListSchema);
exports.default = SpendingsType;
//# sourceMappingURL=SpendingsList.js.map