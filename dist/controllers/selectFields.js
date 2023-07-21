"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SelectFields_1 = __importDefault(require("../models/SelectFields"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const selectFieldsRouter = (0, crudRouter_1.default)(SelectFields_1.default);
exports.default = selectFieldsRouter;
//# sourceMappingURL=selectFields.js.map