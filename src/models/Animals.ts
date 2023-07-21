import mongoose from "mongoose";
import { commonPreHooks, commonSchemaPaths } from ".";
import Weights from "./Weights";
import { animalNotification } from "../services/notification";

import { AnimalInterface, GenderEnum } from "../types/Animal";

function validateSerialNumber(serialNumber: any) {
    if (isFinite(serialNumber)) {
        return true;
    }
    throw new Error("Invalid serial number!");
}

function formatNumber(num: number | string) {
    const numStr = num.toString();
    return `${Array(8 - numStr.length)
        .fill("0")
        .join("")}${numStr}`;
}

const AnimalsSchema = new mongoose.Schema<AnimalInterface>({
    animalType: { type: mongoose.Schema.Types.ObjectId, ref: "AnimalTypes" },
    serialNumber: { type: String, validate: validateSerialNumber },
    weight: { type: Number },
    gender: { type: String, enum: GenderEnum },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Animals" },
    parentNumber: { type: String, validate: validateSerialNumber },
    birthDate: { type: Date },
    removed: {type: Boolean},
    subTypes: {type: String},
    deregisterReason: { type: mongoose.Schema.Types.ObjectId , ref: "DeregisterReasons" },
    deregisterNote: { type: mongoose.Schema.Types.ObjectId , ref: "DeregisterNote"},
    deregisterDate: { type: Date },
    deregisterSubReason: { type: String },
    ...commonSchemaPaths,
});

commonPreHooks(AnimalsSchema);

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

const Animals = mongoose.model("Animals", AnimalsSchema);

export default Animals;
