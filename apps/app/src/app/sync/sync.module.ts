import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { SYNC_FEATURE_KEY, reducer } from './sync.reducer'
import { EffectsModule } from '@ngrx/effects'
import { SyncEffects } from './sync.effects'

@NgModule({
    imports: [
        StoreModule.forFeature(SYNC_FEATURE_KEY, reducer),
        EffectsModule.forRoot(SyncEffects),
    ],
})
export class SyncModule {}
