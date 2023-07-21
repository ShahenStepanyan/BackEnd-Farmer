import { Document, Types } from "mongoose";

export interface SchemaInterface {
    createdAt?: Date;
    createdBy?: Types.ObjectId;
    updatedAt?: Date;
    updatedBy?: Types.ObjectId;
    removed?: boolean;
}

export type DocumentInterface<S> = Document<unknown, any, S> & S & { _id: Types.ObjectId };
