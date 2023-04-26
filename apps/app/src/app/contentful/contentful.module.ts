import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { CONTENTFUL_FEATURE_KEY, reducer } from './contentful.reducer'
import { ContentfulEffects } from './contentful.effects'
import { ContentfulService } from './contentful.service'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(CONTENTFUL_FEATURE_KEY, reducer),
        EffectsModule.forFeature([]),
    ],
    providers: [ContentfulService],
})
export class ContentfulModule {}
