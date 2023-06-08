import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { IEquipmentProperty, IEquipmentPropertyTypes } from '../../model'

@Component({
    selector: 'beta-asset-app-equipment-property',
    templateUrl: './equipment-property.component.html',
    styleUrls: ['./equipment-property.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class EquipmentPropertyComponent {
    @Input() property!: IEquipmentProperty

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor() {}
}
