import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
    IEquipmentBase,
    IEquipmentProperty,
    IEquipmentPropertyBase,
    IEquipmentPropertyMetaTypes,
    IGroupEquipmentProperty,
    IMultiEquipmentProperty,
    IValue,
} from '../../model'
import { EquipmentPropertyBaseComponent } from '../equipment-property-base/equipment-property.component-base'
import { EquipmentPropertyMultiComponent } from '../equipment-property-multi/equipment-property.component-multi'
import { EquipmentPropertyGroupComponent } from '../equipment-property-group/equipment-property.component-group'

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
        EquipmentPropertyGroupComponent,
    ],
})
export class EquipmentPropertyComponent {
    @Input() property!: IEquipmentProperty
    @Input() values!: IEquipmentBase['properties']

    public IEquipmentPropertyMetaTypes = IEquipmentPropertyMetaTypes

    constructor() {}

    get baseProperty(): IEquipmentPropertyBase {
        return this.property as IEquipmentPropertyBase
    }

    get baseValue() {
        return this.values[this.property.fieldId] as IValue
    }

    get multiProperty(): IMultiEquipmentProperty {
        return this.property as IMultiEquipmentProperty
    }

    get multiValue() {
        return this.values[this.property.fieldId] as IValue[]
    }

    get groupProperty(): IGroupEquipmentProperty {
        return this.property as IGroupEquipmentProperty
    }

    get groupValue() {
        return this.values[this.property.fieldId] as Record<string, IValue[]>
    }
}
