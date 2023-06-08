import { RichTextDataTarget } from 'contentful'

export interface ListPageListItem {
    id: string
    name: string
}

type ILink = RichTextDataTarget

export interface IEquipmentBase {
    brand: string
    name: string
    location: string
    serialNumber: string
    type: ILink
    extraProperties: Array<ILink>
}

export enum IEquipmentPropertyTypes {
    TEXT = 'Text',
    NUMBER = 'Number',
    DATE = 'Date',
}

export interface IEquipmentProperty {
    description: string
    type: IEquipmentPropertyTypes
    unit?: string
    textValue?: string
    numberValue?: number
    dateValue?: Date
}
