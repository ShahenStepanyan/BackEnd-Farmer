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
const getAnimalsDiedAndSold_1 = __importDefault(require("../models/getAnimalsDiedAndSold"));
const getAnimalsDiedRouter = express_1.default.Router();
getAnimalsDiedRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animals = yield getAnimalsDiedAndSold_1.default.find({
            removed: true,
            deregisterReason: "628bc1c1096d05d7cacea382",
        });
        const animalCounts = {};
        animals.forEach((animal) => {
            animalCounts[animal.animalType] = (animalCounts[animal.animalType] || 0) + 1;
        });
        res.send(animalCounts);
    }
    catch (_a) { }
}));
exports.default = getAnimalsDiedRouter;
//# sourceMappingURL=getAnimalsDied.js.map