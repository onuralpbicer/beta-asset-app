import { Injectable, inject } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { switchMap, catchError, of, map } from 'rxjs'
import * as EquipmentTypesActions from './equipment-types.actions'
import * as EquipmentTypesFeature from './equipment-types.reducer'
import { Action } from '@ngrx/store/src'
import { ContentfulService } from '../services/contentful.service'

@Injectable()
export class EquipmentTypesEffects {
    private actions$ = inject(Actions)
    private contenfulService = inject(ContentfulService)

    loadEquipmentTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EquipmentTypesActions.initEquipmentTypes),
            switchMap(() =>
                this.contenfulService.getEquipmentTypeList().pipe(
                    map((result) =>
                        result.map(
                            (entry): EquipmentTypesFeature.IEquipmentType => ({
                                id: entry.sys.id,
                                name: entry.fields.name,
                                equipments:
                                    entry.fields.equipments?.map(
                                        (entry) => entry.sys.id,
                                    ) ?? [],
                            }),
                        ),
                    ),
                    map((result) =>
                        EquipmentTypesActions.initEquipmentTypesSuccess({
                            equipmentTypeList: result,
                        }),
                    ),
                    catchError((err) => {
                        console.log('error')
                        console.log(err)
                        return of(
                            EquipmentTypesActions.initEquipmentTypesFail(),
                        )
                    }),
                ),
            ),
        ),
    )
}
