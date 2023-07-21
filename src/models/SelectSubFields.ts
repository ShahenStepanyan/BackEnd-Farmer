import mongoose from "mongoose";
import { commonPreHooks, commonSchemaPaths } from ".";

import type { SelectSubFieldInterface } from "../types/SelectSubFields";

const SelectSubFieldsSchema = new mongoose.Schema<SelectSubFieldInterface>({
    name: { type: String, required: [true, "Name is required"] },
    selectField: { type: mongoose.Schema.Types.ObjectId, ref: "SelectFields" },
    ...commonSchemaPaths,
});

commonPreHooks(SelectSubFieldsSchema);

SelectSubFieldsSchema.index({ name: 1, selectField: 1 }, { unique: true });

const SelectSubFields = mongoose.model("SelectSubFields", SelectSubFieldsSchema);

export default SelectSubFields;
