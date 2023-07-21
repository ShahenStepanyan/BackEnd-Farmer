import mongoose from "mongoose";
import { commonPreHooks, commonSchemaPaths } from ".";
import Animals from "./Animals";

import type { WeightInterface } from "../types/Weight";

const WeightsSchema = new mongoose.Schema<WeightInterface>({
    weight: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
    animalType: { type: mongoose.Schema.Types.ObjectId, ref: "AnimalTypes" },
    animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animals" },
    ...commonSchemaPaths,
});

commonPreHooks(WeightsSchema);

WeightsSchema.pre("save", async function (next) {
    const animal = await Animals.findById(this.animal);
    this.animalType = animal.animalType;

    const [lastItem] = await Weights.find({ animal: this.animal }).sort("-date").limit(1)
    if (!lastItem || lastItem.date < this.date) {
        await Animals.updateOne({ _id: this.animal }, { weight: this.weight });
    }
    next();
});

WeightsSchema.pre("updateOne", async function (next) {
    const animal = await Animals.findById(this.animal);
    this.animalType = animal.animalType;

    const [lastItem] = await Weights.find({ animal: this.animal }).sort("-date").limit(1)
    if (lastItem.date < this.date) {
        await Animals.updateOne({ _id: this.animal }, { weight: this.weight });
    }
    next();
});

const Weights = mongoose.model("Weights", WeightsSchema);

export default Weights;
