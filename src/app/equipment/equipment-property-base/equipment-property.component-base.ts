import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { IEquipmentPropertyBase, IEquipmentPropertyTypes } from '../../model'

@Component({
    selector: 'beta-asset-app-equipment-property-base',
    templateUrl: './equipment-property.component-base.html',
    styleUrls: ['./equipment-property.component-base.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class EquipmentPropertyBaseComponent {
    @Input() property!: IEquipmentPropertyBase

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor() {}
}
