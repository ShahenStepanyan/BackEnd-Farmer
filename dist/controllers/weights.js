"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Weights_1 = __importDefault(require("../models/Weights"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const weightsRouter = (0, crudRouter_1.default)(Weights_1.default);
exports.default = weightsRouter;
//# sourceMappingURL=weights.js.map