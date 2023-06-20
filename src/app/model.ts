import { RichTextDataTarget } from 'contentful'

export interface ListPageListItem {
    id: string
    name: string
}

export type ILink = RichTextDataTarget

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

export enum IEquipmentPropertyMetaTypes {
    Normal = 'equipmentProperty',
    Multi = 'multiEquipmentProperty',
    Group = 'equipmentPropertyGroup',
}

export interface IMultiEquipmentProperty {
    fieldType: IEquipmentPropertyMetaTypes.Multi
    items: Array<Omit<IEquipmentPropertyBase, 'fieldType'>>
    overrideUnit: string
}

export interface IEquipmentPropertyBase {
    fieldType: IEquipmentPropertyMetaTypes.Normal
    description: string
    type: IEquipmentPropertyTypes
    unit?: string
    textValue?: string
    numberValue?: number
    dateValue?: Date
}

export type IEquipmentProperty =
    | IEquipmentPropertyBase
    | IMultiEquipmentProperty

export interface IEquipmentType {
    name: string
    equipments: Array<ILink>
    maintenanceTasks: Array<string>
}

type Nullable<T> = T | null

export interface IMaintenanceTask {
    name: string
    description?: string
    uygun: Nullable<boolean>
    yapilanIs: Nullable<'Onarildi' | 'Yenilendi'>
}

export interface IMaintenanceReport {
    date: Date
    user: string
    type: string
    equipmentId: string
    tasks: Array<IMaintenanceTask>
}

export interface IMaintenanceSummary {
    id: string
    type: string
    date: Date
}
