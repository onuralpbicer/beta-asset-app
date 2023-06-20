import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
    IEquipmentProperty,
    IEquipmentPropertyBase,
    IEquipmentPropertyMetaTypes,
    IMultiEquipmentProperty,
} from '../../model'
import { EquipmentPropertyBaseComponent } from '../equipment-property-base/equipment-property.component-base'
import { EquipmentPropertyMultiComponent } from '../equipment-property-multi/equipment-property.component-multi'

@Component({
    selector: 'beta-asset-app-equipment-property',
    templateUrl: './equipment-property.component.html',
    styleUrls: ['./equipment-property.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        EquipmentPropertyBaseComponent,
        EquipmentPropertyMultiComponent,
    ],
})
export class EquipmentPropertyComponent {
    @Input() property!: IEquipmentProperty

    public IEquipmentPropertyMetaTypes = IEquipmentPropertyMetaTypes

    constructor() {}

    get baseProperty(): IEquipmentPropertyBase {
        return this.property as IEquipmentPropertyBase
    }

    get multiProperty(): IMultiEquipmentProperty {
        return this.property as IMultiEquipmentProperty
    }
}
