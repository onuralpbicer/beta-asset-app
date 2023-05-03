import { createAction, props } from '@ngrx/store'

export const initEquipments = createAction(
    '[Equipments Page] Init',
    props<{ id: string }>(),
)
