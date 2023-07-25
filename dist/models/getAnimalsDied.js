"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const AnimlsDiedListSchema = new mongoose_1.default.Schema(Object.assign({ deregisterReason: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "DeregisterReasons" }, deregisterNote: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "DeregisterNote" }, deregisterDate: { type: Date }, animalType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "AnimalTypes" }, deregisterSubReason: { type: String } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(AnimlsDiedListSchema);
const AnimlsDiedType = mongoose_1.default.model("animals", AnimlsDiedListSchema);
exports.default = AnimlsDiedType;
//# sourceMappingURL=getAnimalsDied.js.map