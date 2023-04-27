import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import {
    createReducer,
    on,
    Action,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store'

import * as EquipmentTypesActions from './equipment-types.actions'
import { ViewStatus } from '../model'

export const EQUIPMENT_TYPES_FEATURE_KEY = 'equipmentTypes'

export interface IEquipmentType {
    id: string
    name: string
    equipments: Array<string>
}

const adapter = createEntityAdapter<IEquipmentType>()

const initialState = {
    viewStatus: ViewStatus.Initial,
    entities: adapter.getInitialState(),
}

export type IEquipmentTypeListState = typeof initialState

export const reducer = createReducer(
    initialState,
    on(EquipmentTypesActions.initEquipmentTypes, (state) => ({
        ...initialState,
        viewStatus: ViewStatus.Loading,
    })),
    on(EquipmentTypesActions.initEquipmentTypesSuccess, (state, action) => ({
        ...state,
        entities: adapter.addMany(action.equipmentTypeList, state.entities),
        viewStatus: ViewStatus.Success,
    })),
    on(EquipmentTypesActions.initEquipmentTypesFail, (state) => initialState),
)

const entitySelectors = adapter.getSelectors()

const selector = createFeatureSelector<IEquipmentTypeListState>(
    EQUIPMENT_TYPES_FEATURE_KEY,
)

export const selectEquipmentListViewStatus = createSelector(
    selector,
    (state) => state.viewStatus,
)

export const selectEquipmentList = createSelector(selector, (state) =>
    entitySelectors.selectAll(state.entities),
)
