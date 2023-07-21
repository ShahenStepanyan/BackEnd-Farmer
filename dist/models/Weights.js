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
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const Animals_1 = __importDefault(require("./Animals"));
const WeightsSchema = new mongoose_1.default.Schema(Object.assign({ weight: { type: Number, required: true }, date: { type: Date, default: () => new Date() }, animalType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "AnimalTypes" }, animal: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Animals" } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(WeightsSchema);
WeightsSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const animal = yield Animals_1.default.findById(this.animal);
        this.animalType = animal.animalType;
        const [lastItem] = yield Weights.find({ animal: this.animal }).sort("-date").limit(1);
        if (!lastItem || lastItem.date < this.date) {
            yield Animals_1.default.updateOne({ _id: this.animal }, { weight: this.weight });
        }
        next();
    });
});
WeightsSchema.pre("updateOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const animal = yield Animals_1.default.findById(this.animal);
        this.animalType = animal.animalType;
        const [lastItem] = yield Weights.find({ animal: this.animal }).sort("-date").limit(1);
        if (lastItem.date < this.date) {
            yield Animals_1.default.updateOne({ _id: this.animal }, { weight: this.weight });
        }
        next();
    });
});
const Weights = mongoose_1.default.model("Weights", WeightsSchema);
exports.default = Weights;
//# sourceMappingURL=Weights.js.map