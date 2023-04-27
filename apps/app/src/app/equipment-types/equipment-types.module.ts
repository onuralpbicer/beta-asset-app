import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import * as fromEquipmentTypes from './equipment-types.reducer'
import { EquipmentTypesEffects } from './equipment-types.effects'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(
            fromEquipmentTypes.EQUIPMENT_TYPES_FEATURE_KEY,
            fromEquipmentTypes.reducer,
        ),
        EffectsModule.forFeature([EquipmentTypesEffects]),
    ],
})
export class EquipmentTypesModule {}
