"use strict";
import mongoose, { Schema, Document } from "mongoose";
import { commonSchemaPaths, commonPreHooks } from ".";

const SpendingsListSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: [false, "Amount is required"],
    unique: true,
  },
  date: {
    type: String,
    required: [false, "Date is required"],
    unique: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    required: [false, "Date is required"],
    unique: true,
  },
  ...commonSchemaPaths,
});

commonPreHooks(SpendingsListSchema);

const SpendingsType = mongoose.model("spendings", SpendingsListSchema);

export default SpendingsType;
