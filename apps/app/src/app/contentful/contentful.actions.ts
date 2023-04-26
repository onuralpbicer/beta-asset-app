import { createAction, props } from '@ngrx/store'
import { SyncCollection } from 'contentful'

export const checkSync = createAction('[Contentful] Check Sync')

export const syncSuccess = createAction(
    '[Contentful] Sync Success',
    props<{ collection: SyncCollection }>(),
)

export const cacheEntries = createAction(
    '[Contentful] Cache Entries',
    props<{ collection: SyncCollection }>(),
)

export const cacheAssets = createAction(
    '[Contentful] Cache Assets',
    props<{ collection: SyncCollection }>(),
)

export const cacheSuccess = createAction(
    '[Contentful] Cache Success',
    props<Pick<SyncCollection, 'nextSyncToken'>>(),
)
