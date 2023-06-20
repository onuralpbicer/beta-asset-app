import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { IEquipmentPropertyTypes, IMultiEquipmentProperty } from '../../model'

@Component({
    selector: 'beta-asset-app-equipment-property-multi',
    templateUrl: './equipment-property.component-multi.html',
    styleUrls: ['./equipment-property.component-multi.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class EquipmentPropertyMultiComponent {
    @Input() property!: IMultiEquipmentProperty

    public IEquipmentPropertyType = IEquipmentPropertyTypes

    constructor() {}
}
