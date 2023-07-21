"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SelectSubFields_1 = __importDefault(require("../models/SelectSubFields"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const selectSubFieldsRouter = (0, crudRouter_1.default)(SelectSubFields_1.default);
exports.default = selectSubFieldsRouter;
//# sourceMappingURL=selectSubFields.js.map