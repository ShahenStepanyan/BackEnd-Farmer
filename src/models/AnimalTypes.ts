import mongoose from "mongoose";
import { commonPreHooks, commonSchemaPaths } from ".";

const AnimalTypesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    },
    ...commonSchemaPaths,
});

commonPreHooks(AnimalTypesSchema);

const AnimalTypes = mongoose.model("AnimalTypes", AnimalTypesSchema);

export default AnimalTypes;
