import { Entry, Link } from 'contentful'

export interface IEquipmentTypeListEntry {
    equipmentTypes: Array<Entry<IEquipmentTypeEntry>>
}

export interface IEquipmentTypeEntry {
    name: string
    maintenanceTasks: string[]
    equipments: Array<Pick<Entry<any>, 'sys'>>
}

export enum ViewStatus {
    Initial = 'Initial',
    Loading = 'Loading',
    Success = 'Success',
}
