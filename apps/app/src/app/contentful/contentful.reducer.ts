import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import {
    createReducer,
    on,
    Action,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store'
import { cacheSuccess, checkSync, syncSuccess } from './contentful.actions'

export const CONTENTFUL_FEATURE_KEY = 'contentful'

export enum IContentfulViewState {
    Initial = 'Initial',
    Syncing = 'Syncing',
    Caching = 'Caching',
    Success = 'Success',
    Failure = 'Failure',
}

export interface IContentfulState {
    nextSyncToken: string | null
    viewStatus: IContentfulViewState
}

export const initialAppState: IContentfulState = {
    nextSyncToken: null,
    viewStatus: IContentfulViewState.Initial,
}

export const reducer = createReducer(
    initialAppState,
    on(checkSync, (state) => ({
        ...state,
        viewStatus: IContentfulViewState.Syncing,
    })),
    on(syncSuccess, (state) => ({
        ...state,
        viewStatus: IContentfulViewState.Caching,
    })),
    on(cacheSuccess, (state, { nextSyncToken }) => ({
        ...state,
        nextSyncToken,
        viewStatus: IContentfulViewState.Success,
    })),
)

const selector = createFeatureSelector<IContentfulState>(CONTENTFUL_FEATURE_KEY)

export const selectNextSyncToken = createSelector(
    selector,
    (state) => state.nextSyncToken,
)
