import { Types } from "mongoose";
import { SchemaInterface, DocumentInterface } from ".";

export enum GenderEnum {
    MALE = "male",
    FEMALE = "female",
}

export interface AnimalInterface extends SchemaInterface {
    animalType: Types.ObjectId;
    serialNumber: string;
    weight: number;
    gender: GenderEnum;
    parent?: Types.ObjectId;
    parentNumber?: string;
    removed?: boolean;
    subTypes?: string
    birthDate: Date;
    deregisterReason?: Types.ObjectId | String;
    deregisterNote?: string;
    deregisterDate?: Date;
    deregisterSubReason?: string;
}

export type AnimalDocument = DocumentInterface<AnimalInterface>;
