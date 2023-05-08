import { ActionReducer, MetaReducer } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'
import { NEXT_SYNC_TOKEN_KEY, SYNC_FEATURE_KEY } from '../sync/sync.reducer'

function localStorageSyncReducer(
    reducer: ActionReducer<any>,
): ActionReducer<any> {
    return localStorageSync({
        keys: [
            {
                [SYNC_FEATURE_KEY]: [NEXT_SYNC_TOKEN_KEY],
            },
        ],
        rehydrate: true,
        storageKeySerializer: (key) => `beta-app-${key}`,
    })(reducer)
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]

export default metaReducers
