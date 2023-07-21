import { Types } from "mongoose";
import { SchemaInterface, DocumentInterface } from ".";

export interface SelectSubFieldInterface extends SchemaInterface {
    name: string;
    selectField: Types.ObjectId;
}

export type SelectSubFieldDocument = DocumentInterface<SelectSubFieldInterface>;
