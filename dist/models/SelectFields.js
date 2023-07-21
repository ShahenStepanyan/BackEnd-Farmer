"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const SelectFields_1 = require("../types/SelectFields");
const SelectFieldsSchema = new mongoose_1.default.Schema(Object.assign({ name: { type: String, required: [true, "Name is required"] }, type: { type: String, enum: SelectFields_1.SelectFieldTypeEnum, default: SelectFields_1.SelectFieldTypeEnum.DEREGISTER }, subFieldIsRequired: { type: Boolean, default: false } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(SelectFieldsSchema);
SelectFieldsSchema.index({ name: 1, type: 1 }, { unique: true });
const SelectFields = mongoose_1.default.model("SelectFields", SelectFieldsSchema);
exports.default = SelectFields;
//# sourceMappingURL=SelectFields.js.map