"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const AnimalTypesSchema = new mongoose_1.default.Schema(Object.assign({ name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(AnimalTypesSchema);
const AnimalTypes = mongoose_1.default.model("AnimalTypes", AnimalTypesSchema);
exports.default = AnimalTypes;
//# sourceMappingURL=AnimalTypes.js.map