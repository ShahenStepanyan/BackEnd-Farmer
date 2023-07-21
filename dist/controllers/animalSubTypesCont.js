"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimalSubTypes_1 = __importDefault(require("../models/AnimalSubTypes"));
const crudRouter_1 = __importDefault(require("../utils/crudRouter"));
const animalSubTypesRouter = (0, crudRouter_1.default)(AnimalSubTypes_1.default);
exports.default = animalSubTypesRouter;
//# sourceMappingURL=animalSubTypesCont.js.map