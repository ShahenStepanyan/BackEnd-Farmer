"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const Animal_1 = require("../types/Animal");
function validateSerialNumber(serialNumber) {
    if (isFinite(serialNumber)) {
        return true;
    }
    throw new Error("Invalid serial number!");
}
function formatNumber(num) {
    const numStr = num.toString();
    return `${Array(8 - numStr.length)
        .fill("0")
        .join("")}${numStr}`;
}
const AnimalsSchema = new mongoose_1.default.Schema(Object.assign({ animalType: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "AnimalTypes" }, serialNumber: { type: String, validate: validateSerialNumber }, weight: { type: Number }, gender: { type: String, enum: Animal_1.GenderEnum }, parent: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Animals" }, parentNumber: { type: String, validate: validateSerialNumber }, birthDate: { type: Date }, removed: { type: Boolean }, subTypes: { type: String }, deregisterReason: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "DeregisterReasons" }, deregisterNote: { type: String }, deregisterDate: { type: Date }, deregisterSubReason: { type: String } }, _1.commonSchemaPaths));
(0, _1.commonPreHooks)(AnimalsSchema);
// AnimalsSchema.pre("save", async function (next) {
//     if (this.parent) {
//         const parent = await Animals.findById(this.parent);
//         this.parentNumber = parent?.serialNumber;
//     }
//     this.serialNumber = formatNumber(this.serialNumber);
//     next();
// });
// AnimalsSchema.post("save", async function (animal) {
//     if (animal.weight) {
//         await Weights.create({
//             weight: animal.weight,
//             animalType: animal.animalType,
//             animal: animal._id,
//         });
//     }
//     await animalNotification("created", animal);
// });
// AnimalsSchema.index({ animalType: 1, serialNumber: 1 }, { unique: true });
// AnimalsSchema.pre("findOneAndUpdate", async function (next) {
//     const oldItem = await Animals.findOne(this.clone());
//     if (oldItem.removed) {
//         throw new Error("Can not update deregistered animal!");
//     }
//     const weight = this.get("weight");
//     if (weight && oldItem.weight !== weight) {
//         await Weights.create({
//             weight,
//             animalType: oldItem.animalType,
//             animal: oldItem._id,
//         });
//     }
//     if (!oldItem.removed && this.get("removed")) {
//         await animalNotification("deregistered", oldItem);
//     }
//     next();
// });
const Animals = mongoose_1.default.model("Animals", AnimalsSchema);
exports.default = Animals;
//# sourceMappingURL=Animals.js.map