import { RichTextDataTarget } from 'contentful'

export interface ListPageListItem {
    id: string
    name: string
}

export type ILink = RichTextDataTarget

export type IValue = string | boolean | Date | number

export interface IEquipmentBase {
    name: string
    type: ILink
    properties: Record<
        string,
        IValue | Array<IValue> | Record<string, IValue[]>
    >
}

export enum IEquipmentPropertyTypes {
    TEXT = 'Text',
    NUMBER = 'Number',
    DATE = 'Date',
    TOGGLE = 'Toggle',
}

export enum IEquipmentPropertyMetaTypes {
    Normal = 'equipmentProperty',
    Multi = 'multiEquipmentProperty',
    Group = 'equipmentPropertyGroup',
}

export interface IGroupEquipmentProperty {
    fieldType: IEquipmentPropertyMetaTypes.Group
    fieldId: string
    value1Name: string
    value2Name: string
    items: Array<IEquipmentPropertyBase>
}

export interface IMultiEquipmentProperty {
    fieldType: IEquipmentPropertyMetaTypes.Multi
    fieldId: string
    items: Array<Omit<IEquipmentPropertyBase, 'fieldType'>>
    overrideUnit: string
}

export interface IEquipmentPropertyBase {
    fieldType: IEquipmentPropertyMetaTypes.Normal
    fieldId: string
    description: string
    type: IEquipmentPropertyTypes
    unit?: string
    toggleOptions?: string[]
    textValue?: string
    numberValue?: number
    dateValue?: Date
    toggleValue?: number
}

export type IEquipmentProperty =
    | IEquipmentPropertyBase
    | IMultiEquipmentProperty
    | IGroupEquipmentProperty

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
