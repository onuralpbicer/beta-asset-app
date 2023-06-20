import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { IEquipmentPropertyTypes, IMultiEquipmentProperty } from '../../model'
import { EquipmentPropertyValueComponent } from '../equipment-property-value/equipment-property.component-value'

@Component({
    selector: 'beta-asset-app-equipment-property-multi',
    templateUrl: './equipment-property.component-multi.html',
    styleUrls: ['./equipment-property.component-multi.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, EquipmentPropertyValueComponent],
})
export class EquipmentPropertyMultiComponent {
    @Input() property!: IMultiEquipmentProperty

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor() {}
}
