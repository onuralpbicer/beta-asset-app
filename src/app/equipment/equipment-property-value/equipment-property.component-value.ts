import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
    IEquipmentPropertyBase,
    IEquipmentPropertyTypes,
    IMultiEquipmentProperty,
    IValue,
    IValueMap,
} from '../../model'

@Component({
    selector: 'beta-asset-app-equipment-property-value',
    templateUrl: './equipment-property.component-value.html',
    styleUrls: ['./equipment-property.component-value.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class EquipmentPropertyValueComponent implements OnInit {
    @Input() property!: Omit<
        IEquipmentPropertyBase,
        'fieldType' | 'description' | 'unit'
    >
    @Input() values!: IValueMap

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor() {}

    ngOnInit(): void {
        console.log(this.property, this.values)
    }
}
