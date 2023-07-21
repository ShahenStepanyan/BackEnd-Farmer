"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimalsProblems_1 = __importDefault(require("../models/AnimalsProblems"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const AnimalsProblemsRouter = (0, crudRouter_1.default)(AnimalsProblems_1.default);
exports.default = AnimalsProblemsRouter;
//# sourceMappingURL=animalsProblems.js.map