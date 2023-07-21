"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genToken = (user) => jsonwebtoken_1.default.sign({
    iss: process.env.JWT_PRIVATE_SECRET,
    sub: user.id,
    role: user.role,
    iat: new Date().getTime(),
    exp: new Date().setHours(new Date().getHours() + 1),
    // exp: new Date().setDate(new Date().getDate() + 1),
}, process.env.JWT_PRIVATE_SECRET);
exports.genToken = genToken;
//# sourceMappingURL=jwt.js.map