import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import * as fromEquipments from './equipments.reducer'
import { EquipmentsEffects } from './equipments.effects'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(
            fromEquipments.EQUIPMENTS_FEATURE_KEY,
            fromEquipments.reducer,
        ),
        EffectsModule.forFeature([EquipmentsEffects]),
    ],
})
export class EquipmentsModule {}
