import { Types } from "mongoose";
import { SchemaInterface, DocumentInterface } from ".";

export interface WeightInterface extends SchemaInterface {
    weight: number;
    date: Date;
    animalType: Types.ObjectId;
    animal: Types.ObjectId;
}

export type WeightDocument = DocumentInterface<WeightInterface>;
