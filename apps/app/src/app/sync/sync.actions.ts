import { createAction, props } from '@ngrx/store'
import { SyncCollection } from 'contentful'

export const syncStart = createAction('[Sync] Start')

export const syncCommence = createAction(
    '[Sync] Commence',
    props<{ collection: SyncCollection }>(),
)

export const syncComplete = createAction(
    '[Sync] Complete',
    props<{ nextSyncToken: string }>(),
)

export const syncFailure = createAction('[Sync] Failure')
