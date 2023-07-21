"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonPreHooks = exports.commonSchemaPaths = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.commonSchemaPaths = {
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users" },
    createdAt: { type: Date, default: () => new Date() },
    updatedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users" },
    updatedAt: { type: Date },
    removed: { type: Boolean, default: false },
};
function commonPreHooks(schema) {
    schema.pre("updateOne", function (next) {
        this.updatedAt = new Date();
        next();
    });
    schema.pre("findOneAndUpdate", function (next) {
        this.set("updatedAt", new Date());
        next();
    });
}
exports.commonPreHooks = commonPreHooks;
//# sourceMappingURL=index.js.map