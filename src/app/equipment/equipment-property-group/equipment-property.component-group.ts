import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
    IEquipmentPropertyBase,
    IEquipmentPropertyTypes,
    IGroupEquipmentProperty,
    IValue,
    IValueMap,
} from '../../model'
import { EquipmentPropertyValueComponent } from '../equipment-property-value/equipment-property.component-value'
import { equals, pick, prop } from 'rambda'
import { EquipmentService } from '../equipment.service'
import { ArrayTypeof } from 'src/app/types'

@Component({
    selector: 'beta-asset-app-equipment-property-group',
    templateUrl: './equipment-property.component-group.html',
    styleUrls: ['./equipment-property.component-group.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, EquipmentPropertyValueComponent],
})
export class EquipmentPropertyGroupComponent {
    @Input() property!: IGroupEquipmentProperty
    @Input() value!: Record<string, IValue[]>

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor(private equipmentService: EquipmentService) {}

    public getValueMap(
        item: ArrayTypeof<IGroupEquipmentProperty['items']>,
        index: number,
    ): IValueMap {
        return this.equipmentService.getValueMap(
            item,
            this.value?.[item.fieldId]?.[index],
        )
    }
}
