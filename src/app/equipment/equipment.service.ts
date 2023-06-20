import { Injectable } from '@angular/core'
import { ContentfulService } from '../services/contentful.service'
import {
    IEquipmentBase,
    IEquipmentProperty,
    IEquipmentPropertyMetaTypes,
    IEquipmentPropertyTypes,
    IEquipmentType,
    IGroupEquipmentProperty,
    ILink,
    IMultiEquipmentProperty,
    IMultiEquipmentPropertyItem,
} from '../model'
import { from, map } from 'rxjs'
import { ArrayTypeof } from '../types'
import { renderUnit } from '../util'

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {
    constructor(private contentfulService: ContentfulService) {}

    public getEquipmentTypeId(equipmentId: string) {
        return from(
            this.contentfulService.getEntry<IEquipmentBase>(equipmentId),
        ).pipe(map((equipment) => equipment.fields.type.sys.id))
    }

    public getEquipmentType(equipmentTypeId: string) {
        return from(
            this.contentfulService.getEntry<IEquipmentType>(equipmentTypeId),
        ).pipe(map((equipmentType) => equipmentType.fields))
    }

    public async loadEquipmentProperty(
        id: string,
    ): Promise<IEquipmentProperty | null> {
        const entry = await this.contentfulService.getEntry<any>(id)
        switch (entry.sys.contentType.sys.id) {
            case IEquipmentPropertyMetaTypes.Normal:
                return {
                    ...entry.fields,
                    unit: renderUnit(entry.fields.unit),
                    fieldType: IEquipmentPropertyMetaTypes.Normal,
                }

            case IEquipmentPropertyMetaTypes.Multi:
                return this.loadMultiEquipmentProperty(entry)

            case IEquipmentPropertyMetaTypes.Group:
                return this.loadGroupEquipmentProperty(entry)

            default:
                return null
        }
    }

    private async loadMultiEquipmentProperty(
        entry: any,
    ): Promise<IMultiEquipmentProperty> {
        const items: IMultiEquipmentProperty['items'] = await Promise.all(
            entry.fields.items.map(async (item: ILink) => {
                const itemEntry = await this.contentfulService.getEntry<
                    ArrayTypeof<IMultiEquipmentProperty['items']>
                >(item.sys.id)

                return {
                    ...itemEntry.fields,
                    unit: renderUnit(itemEntry.fields.unit),
                }
            }),
        )

        return {
            fieldType: IEquipmentPropertyMetaTypes.Multi,
            overrideUnit: renderUnit(entry.fields.overrideUnit),
            items,
        }
    }

    private async loadGroupEquipmentProperty(
        entry: any,
    ): Promise<IGroupEquipmentProperty> {
        const items: IGroupEquipmentProperty['items'] = await Promise.all(
            entry.fields.items.map(async (item: ILink) => {
                const itemEntry =
                    await this.contentfulService.getEntry<IMultiEquipmentPropertyItem>(
                        item.sys.id,
                    )

                return {
                    ...itemEntry.fields,
                    unit: renderUnit(itemEntry.fields.unit),
                }
            }),
        )

        return {
            fieldType: IEquipmentPropertyMetaTypes.Group,
            value1Name: entry.fields.value1name,
            value2Name: entry.fields.value2name,
            items,
        }
    }
}
