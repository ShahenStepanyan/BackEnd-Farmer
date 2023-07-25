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
const Animals_1 = __importDefault(require("../models/Animals"));
const getChildrensRouter = express_1.default.Router();
getChildrensRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animaType = req.query.params;
    const limit = 6;
    try {
        const animals = yield Animals_1.default.find({
            animalType: animaType,
            removed: false
        }).limit(limit);
        const childCounts = yield Promise.all(animals.map((item) => Animals_1.default.find({ parent: item._id })));
        res.json({ animals, childCounts });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
exports.default = getChildrensRouter;
//# sourceMappingURL=animalsChildrens.js.map