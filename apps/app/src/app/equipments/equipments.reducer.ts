import { createReducer } from '@ngrx/store'

export const EQUIPMENTS_FEATURE_KEY = 'equipments'

const initialState = {}

export type IEquipmentsState = typeof initialState

export const reducer = createReducer(initialState)
