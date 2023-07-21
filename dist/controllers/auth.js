"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../services/jwt");
const authRouter = express_1.default.Router();
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email, removed: false });
    if (!user) {
        res.status(404).send({ message: "Not found!" });
        return;
    }
    if (!(yield user.comparePassword(password))) {
        res.status(403).send({ message: "Password don't match!" });
        return;
    }
    const token = (0, jwt_1.genToken)(user);
    res.status(200).json(Object.assign(Object.assign({}, user.toJSON()), { token }));
}));
exports.default = authRouter;
//# sourceMappingURL=auth.js.map