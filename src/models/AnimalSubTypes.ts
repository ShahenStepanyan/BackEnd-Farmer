import mongoose from "mongoose";
import { commonPreHooks, commonSchemaPaths } from ".";

const AnimalSubTypesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    },
    animalType: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
  },
    ...commonSchemaPaths,
});

commonPreHooks(AnimalSubTypesSchema);

const AnimalSubTypes = mongoose.model("animalsubtypes", AnimalSubTypesSchema);

export default AnimalSubTypes;
