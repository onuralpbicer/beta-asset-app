import { ActionReducer, MetaReducer } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'

function localStorageSyncReducer(
    reducer: ActionReducer<any>,
): ActionReducer<any> {
    return localStorageSync({ keys: [] })(reducer)
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]

export default metaReducers
