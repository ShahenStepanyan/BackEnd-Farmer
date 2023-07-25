"use strict";
import mongoose, { Schema, Document } from "mongoose";
import { commonSchemaPaths, commonPreHooks } from ".";


const AnimlsDiedListSchema = new mongoose.Schema({
  deregisterReason: { type: mongoose.Schema.Types.ObjectId , ref: "DeregisterReasons" },
  deregisterNote: { type: mongoose.Schema.Types.ObjectId , ref: "DeregisterNote"},
  deregisterDate: { type: Date },
  animalType: { type: mongoose.Schema.Types.ObjectId, ref: "AnimalTypes" },
  deregisterSubReason: { type: String },
  ...commonSchemaPaths,
});

commonPreHooks(AnimlsDiedListSchema);

const AnimlsDiedType = mongoose.model("animals", AnimlsDiedListSchema);

export default AnimlsDiedType;
