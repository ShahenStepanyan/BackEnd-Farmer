"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const usersRouter = (0, crudRouter_1.default)(User_1.default);
exports.default = usersRouter;
//# sourceMappingURL=user.js.map