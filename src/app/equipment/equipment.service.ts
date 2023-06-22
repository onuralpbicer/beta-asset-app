import { Injectable } from '@angular/core'
import { ContentfulService } from '../services/contentful.service'
import {
    IEquipmentBase,
    IEquipmentProperty,
    IEquipmentPropertyBase,
    IEquipmentPropertyMetaTypes,
    IEquipmentPropertyTypes,
    IEquipmentType,
    IGroupEquipmentProperty,
    ILink,
    IMultiEquipmentProperty,
    IValue,
} from '../model'
import { from, map } from 'rxjs'
import { ArrayTypeof } from '../types'
import { renderUnit } from '../util'
import { isNil, prop } from 'rambda'

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

    /**
     * Caution!! Mutates input
     * @param property
     * @param value
     */
    private replaceValue(
        property: Omit<IEquipmentPropertyBase, 'fieldType'>,
        value: IValue,
    ) {
        if (isNil(value)) return

        if (property.type === IEquipmentPropertyTypes.TEXT) {
            property.textValue = String(value)
        } else if (property.type === IEquipmentPropertyTypes.NUMBER) {
            const num = Number(value)
            if (!isNaN(num)) property.numberValue = num
        } else if (property.type === IEquipmentPropertyTypes.DATE) {
            property.dateValue = value as Date
        } else if (property.type === IEquipmentPropertyTypes.TOGGLE) {
            property.toggleValue = value as number
        }
    }

    public async loadEquipmentProperty(
        id: string,
        values: IEquipmentBase['properties'],
    ): Promise<IEquipmentProperty | null> {
        const entry = await this.contentfulService.getEntry<any>(id)

        switch (entry.sys.contentType.sys.id) {
            case IEquipmentPropertyMetaTypes.Normal: {
                const baseEntry = entry.fields as Omit<
                    IEquipmentPropertyBase,
                    'fieldType'
                >

                this.replaceValue(
                    baseEntry,
                    values[baseEntry.fieldId] as IValue,
                )

                return {
                    ...baseEntry,
                    unit: renderUnit(entry.fields.unit),
                    fieldType: IEquipmentPropertyMetaTypes.Normal,
                }
            }

            case IEquipmentPropertyMetaTypes.Multi:
                return this.loadMultiEquipmentProperty(entry, values)

            case IEquipmentPropertyMetaTypes.Group:
                return this.loadGroupEquipmentProperty(entry, values)
            default:
                return null
        }
    }

    private async loadMultiEquipmentProperty(
        entry: any,
        values: IEquipmentBase['properties'],
    ): Promise<IMultiEquipmentProperty> {
        const valueList = (values[entry.fields.fieldId] as IValue[]) || []

        const items: IMultiEquipmentProperty['items'] = await Promise.all(
            entry.fields.items.map(async (item: ILink, index: number) => {
                const itemEntry = await this.contentfulService.getEntry<
                    ArrayTypeof<IMultiEquipmentProperty['items']>
                >(item.sys.id)

                this.replaceValue(itemEntry.fields as any, valueList[index])

                return {
                    ...itemEntry.fields,
                    unit: renderUnit(itemEntry.fields.unit),
                }
            }),
        )

        return {
            fieldType: IEquipmentPropertyMetaTypes.Multi,
            overrideUnit: renderUnit(entry.fields.overrideUnit),
            fieldId: '',
            items,
        }
    }

    private async loadGroupEquipmentProperty(
        entry: any,
        values: IEquipmentBase['properties'],
    ): Promise<IGroupEquipmentProperty> {
        const valueMap =
            (values[entry.fields.fieldId] as Record<string, IValue[]>) || {}

        const items: IGroupEquipmentProperty['items'] = await Promise.all(
            entry.fields.items.map(async (item: ILink, index: number) => {
                const itemEntry =
                    await this.contentfulService.getEntry<IEquipmentPropertyBase>(
                        item.sys.id,
                    )

                this.replaceValue(
                    itemEntry.fields,
                    valueMap[itemEntry.fields.fieldId]?.[index],
                )

                return {
                    ...itemEntry.fields,
                    unit: renderUnit(itemEntry.fields.unit),
                }
            }),
        )

        return {
            fieldType: IEquipmentPropertyMetaTypes.Group,
            fieldId: '',
            value1Name: entry.fields.value1name,
            value2Name: entry.fields.value2name,
            items,
        }
    }
}
