"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Animals_1 = __importDefault(require("../models/Animals"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const animalsRouter = (0, crudRouter_1.default)(Animals_1.default);
exports.default = animalsRouter;
//# sourceMappingURL=animals.js.map