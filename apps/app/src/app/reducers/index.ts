import { ActionReducer, MetaReducer } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'
import { CONTENTFUL_FEATURE_KEY } from '../contentful/contentful.reducer'

function localStorageSyncReducer(
    reducer: ActionReducer<any>,
): ActionReducer<any> {
    return localStorageSync({
        keys: [
            {
                [CONTENTFUL_FEATURE_KEY]: ['nextSyncToken'],
            },
        ],
        rehydrate: true,
        storageKeySerializer: (key) => `beta-app-${key}`,
    })(reducer)
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]

export default metaReducers
