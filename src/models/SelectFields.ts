import mongoose from "mongoose";
import { commonPreHooks, commonSchemaPaths } from ".";
import { SelectFieldTypeEnum } from "../types/SelectFields";

import type { SelectFieldInterface } from "../types/SelectFields";

const SelectFieldsSchema = new mongoose.Schema<SelectFieldInterface>({
    name: { type: String, required: [true, "Name is required"] },
    type: { type: String, enum: SelectFieldTypeEnum, default: SelectFieldTypeEnum.DEREGISTER },
    subFieldIsRequired: { type: Boolean, default: false },
    ...commonSchemaPaths,
});

commonPreHooks(SelectFieldsSchema);

SelectFieldsSchema.index({ name: 1, type: 1 }, { unique: true });

const SelectFields = mongoose.model("SelectFields", SelectFieldsSchema);

export default SelectFields;
