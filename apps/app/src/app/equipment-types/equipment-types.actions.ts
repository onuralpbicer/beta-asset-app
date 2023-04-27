import { createAction, props } from '@ngrx/store'
import { IEquipmentType } from './equipment-types.reducer'

export const initEquipmentTypes = createAction('[EquipmentTypes Page] Init')

export const initEquipmentTypesSuccess = createAction(
    '[EquipmentTypes Page] Init Success',
    props<{ equipmentTypeList: Array<IEquipmentType> }>(),
)

export const initEquipmentTypesFail = createAction(
    '[EquipmentTypes Page] Init Failure',
)
