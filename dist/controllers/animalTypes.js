"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimalTypes_1 = __importDefault(require("../models/AnimalTypes"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const animalTypesRouter = (0, crudRouter_1.default)(AnimalTypes_1.default);
exports.default = animalTypesRouter;
//# sourceMappingURL=animalTypes.js.map