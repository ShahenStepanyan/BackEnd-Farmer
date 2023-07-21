import mongoose from "mongoose";

export const commonSchemaPaths = {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    createdAt: { type: Date, default: () => new Date() },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    updatedAt: { type: Date },
    removed: { type: Boolean, default: false },
};

export function commonPreHooks(schema: mongoose.Schema) {
    schema.pre("updateOne", function (next) {
        this.updatedAt = new Date();
        next();
    });
    schema.pre("findOneAndUpdate", function (next) {
        this.set("updatedAt", new Date());
        next();
    });
}
