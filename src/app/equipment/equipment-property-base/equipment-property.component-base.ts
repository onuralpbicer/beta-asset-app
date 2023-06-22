import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
    IEquipmentPropertyBase,
    IEquipmentPropertyTypes,
    IValue,
    IValueMap,
} from '../../model'
import { EquipmentPropertyValueComponent } from '../equipment-property-value/equipment-property.component-value'
import { EquipmentService } from '../equipment.service'

@Component({
    selector: 'beta-asset-app-equipment-property-base',
    templateUrl: './equipment-property.component-base.html',
    styleUrls: ['./equipment-property.component-base.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, EquipmentPropertyValueComponent],
})
export class EquipmentPropertyBaseComponent {
    @Input() property!: IEquipmentPropertyBase
    @Input() value!: IValue

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor(private equipmentService: EquipmentService) {}

    get valueMap(): IValueMap {
        return this.equipmentService.getValueMap(this.property, this.value)
    }
}
