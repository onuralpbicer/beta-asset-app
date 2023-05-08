import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store'
import {
    syncCommence,
    syncComplete,
    syncFailure,
    syncStart,
} from './sync.actions'

export const SYNC_FEATURE_KEY = 'sync'
export const NEXT_SYNC_TOKEN_KEY = 'nextSyncToken'

export enum ISyncStatus {
    Initial,
    Checking,
    Syncing,
    Success,
    Failure,
}

export interface ISyncState {
    status: ISyncStatus
    [NEXT_SYNC_TOKEN_KEY]: string | null
}

const initialState: ISyncState = {
    status: ISyncStatus.Initial,
    [NEXT_SYNC_TOKEN_KEY]: null,
}

export const reducer = createReducer(
    initialState,
    on(syncStart, (state, action) => ({
        ...state,
        status: ISyncStatus.Checking,
    })),
    on(syncCommence, (state, action) => ({
        ...state,
        status: ISyncStatus.Syncing,
    })),
    on(syncComplete, (state, action) => ({
        ...state,
        status: ISyncStatus.Success,
        nextSyncToken: action.nextSyncToken,
    })),
    on(syncFailure, (state, action) => ({
        ...state,
        status: ISyncStatus.Failure,
    })),
)

const selector = createFeatureSelector<ISyncState>(SYNC_FEATURE_KEY)

export const selectNextSyncToken = createSelector(
    selector,
    (state) => state[NEXT_SYNC_TOKEN_KEY],
)

export const selectSyncStatus = createSelector(
    selector,
    (state) => state.status,
)
