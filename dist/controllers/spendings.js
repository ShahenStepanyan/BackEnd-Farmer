"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpendingsList_1 = __importDefault(require("../models/SpendingsList"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const spendingsTypesRouter = (0, crudRouter_1.default)(SpendingsList_1.default);
exports.default = spendingsTypesRouter;
//# sourceMappingURL=spendings.js.map