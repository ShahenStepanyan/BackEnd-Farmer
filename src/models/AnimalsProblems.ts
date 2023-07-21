"use strict";
import mongoose, { Schema, Document } from "mongoose";
import { commonSchemaPaths, commonPreHooks } from ".";

const AnimalProblemsListSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: [false, "Amount is required"],
    unique: true,
  },
  animal: {
    type: String,
    required: [false, "Date is required"],
    unique: true,
  },
  onBirth: {
    type: String,
    required: [false, "Date is required"],
    unique: true,
  },
  type: {
    type: String,
    required: [false, "Date is required"],
    unique: true,
  },
  date: {
    type: String,
    required: [false, "Date is required"],
    unique: true,
  },
  
  ...commonSchemaPaths,
});

commonPreHooks(AnimalProblemsListSchema);

const AnimalsProblems = mongoose.model("animalproblems", AnimalProblemsListSchema);

export default AnimalsProblems;
