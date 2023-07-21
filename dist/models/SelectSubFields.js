"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const SelectSubFieldsSchema = new mongoose_1.default.Schema(Object.assign({ name: { type: String, required: [true, "Name is required"] }, selectField: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "SelectFields" } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(SelectSubFieldsSchema);
SelectSubFieldsSchema.index({ name: 1, selectField: 1 }, { unique: true });
const SelectSubFields = mongoose_1.default.model("SelectSubFields", SelectSubFieldsSchema);
exports.default = SelectSubFields;
//# sourceMappingURL=SelectSubFields.js.map