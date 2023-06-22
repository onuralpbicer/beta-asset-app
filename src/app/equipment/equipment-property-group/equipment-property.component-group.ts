import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
    IEquipmentPropertyBase,
    IEquipmentPropertyTypes,
    IGroupEquipmentProperty,
} from '../../model'
import { EquipmentPropertyValueComponent } from '../equipment-property-value/equipment-property.component-value'
import { equals, pick, prop } from 'rambda'

@Component({
    selector: 'beta-asset-app-equipment-property-group',
    templateUrl: './equipment-property.component-group.html',
    styleUrls: ['./equipment-property.component-group.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, EquipmentPropertyValueComponent],
})
export class EquipmentPropertyGroupComponent {
    @Input() property!: IGroupEquipmentProperty

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor() {}

    public getPropertyToRender(
        item: IEquipmentPropertyBase,
        type: 'first' | 'second',
    ): Omit<IEquipmentPropertyBase, 'fieldType' | 'description' | 'unit'> {
        const property: Omit<
            IEquipmentPropertyBase,
            'fieldType' | 'description' | 'unit'
        > = {
            ...item,
        }

        // if (equals(type, 'second')) {
        //     property.textValue = item.textValue2
        //     property.numberValue = item.numberValue2
        //     property.dateValue = item.dateValue2
        // }

        return property
    }
}
