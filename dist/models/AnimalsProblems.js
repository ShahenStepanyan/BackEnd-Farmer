"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const AnimalProblemsListSchema = new mongoose_1.default.Schema(Object.assign({ problem: {
        type: String,
        required: [false, "Amount is required"],
        unique: true,
    }, animal: {
        type: String,
        required: [false, "Date is required"],
        unique: true,
    }, onBirth: {
        type: String,
        required: [false, "Date is required"],
        unique: true,
    }, type: {
        type: String,
        required: [false, "Date is required"],
        unique: true,
    }, date: {
        type: String,
        required: [false, "Date is required"],
        unique: true,
    } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(AnimalProblemsListSchema);
const AnimalsProblems = mongoose_1.default.model("animalproblems", AnimalProblemsListSchema);
exports.default = AnimalsProblems;
//# sourceMappingURL=AnimalsProblems.js.map