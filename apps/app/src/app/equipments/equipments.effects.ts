import { Injectable, inject } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { switchMap, catchError, of, map } from 'rxjs'
import * as EquipmentsActions from './equipments.actions'
import * as EquipmentsFeature from './equipments.reducer'
import { Action } from '@ngrx/store/src'
import { ContentfulService } from '../services/contentful.service'

@Injectable()
export class EquipmentsEffects {
    private actions$ = inject(Actions)
    private contenfulService = inject(ContentfulService)

    loadEquipments$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(EquipmentsActions.initEquipments),
                switchMap(({ id }) => this.contenfulService.getEquipment(id)),
            ),
        { dispatch: false },
    )
}
