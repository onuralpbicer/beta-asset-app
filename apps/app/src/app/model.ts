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
}
