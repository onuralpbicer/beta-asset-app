import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
    IEquipmentPropertyTypes,
    IMultiEquipmentProperty,
    IValue,
} from '../../model'
import { EquipmentPropertyValueComponent } from '../equipment-property-value/equipment-property.component-value'
import { EquipmentService } from '../equipment.service'
import { ArrayTypeof } from 'src/app/types'

@Component({
    selector: 'beta-asset-app-equipment-property-multi',
    templateUrl: './equipment-property.component-multi.html',
    styleUrls: ['./equipment-property.component-multi.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, EquipmentPropertyValueComponent],
})
export class EquipmentPropertyMultiComponent {
    @Input() property!: IMultiEquipmentProperty
    @Input() value!: IValue[]

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor(private equipmentService: EquipmentService) {}

    public getValueMap(
        item: ArrayTypeof<IMultiEquipmentProperty['items']>,
        index: number,
    ) {
        return this.equipmentService.getValueMap(item, this.value?.[index])
    }
}
