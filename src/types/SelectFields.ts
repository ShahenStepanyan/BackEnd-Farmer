import { SchemaInterface, DocumentInterface } from ".";

export enum SelectFieldTypeEnum {
    DEREGISTER = "deregister",
    PROBLEM = "problem",
}

export interface SelectFieldInterface extends SchemaInterface {
    name: string;
    type: SelectFieldTypeEnum;
    subFieldIsRequired: boolean;
}

export type SelectFieldDocument = DocumentInterface<SelectFieldInterface>;
