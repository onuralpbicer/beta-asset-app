import { Injectable, inject } from '@angular/core'
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects'
import {
    catchError,
    combineLatest,
    map,
    of,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs'
import {
    syncCommence,
    syncComplete,
    syncFailure,
    syncStart,
} from './sync.actions'
import { ContentfulService } from '../services/contentful.service'
import { Store } from '@ngrx/store'
import { ISyncState, selectNextSyncToken } from './sync.reducer'

@Injectable()
export class SyncEffects {
    actions$ = inject(Actions)
    contentService = inject(ContentfulService)
    syncStore = inject(Store<ISyncState>)

    // TODO: probably remove this
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(() => syncStart()),
        ),
    )

    startSync$ = createEffect(() =>
        this.actions$.pipe(
            ofType(syncStart),
            withLatestFrom(this.syncStore.select(selectNextSyncToken)),
            tap(([, nextSyncToken]) =>
                console.log('nextSyncToken', nextSyncToken),
            ),
            switchMap(([, nextSyncToken]) =>
                this.contentService.checkForUpdate(nextSyncToken).pipe(
                    map((res) =>
                        this.contentService.hasChange(res)
                            ? syncCommence({ collection: res })
                            : syncComplete({
                                  nextSyncToken: res.nextSyncToken,
                              }),
                    ),
                ),
            ),
            catchError((err) => {
                console.log('error while sync start', err)
                return of(syncFailure())
            }),
        ),
    )

    syncCommence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(syncCommence),
            tap(({ collection }) => console.log(collection)),
            switchMap(({ collection }) =>
                combineLatest([
                    this.contentService.removeDeletedEntries([
                        ...collection.deletedAssets,
                        ...collection.deletedEntries,
                    ]),
                    this.contentService.storeChangedEntries([
                        ...collection.entries,
                        ...collection.assets,
                    ]),
                    this.contentService.cacheAssets(collection.assets),
                ]).pipe(
                    map(() =>
                        syncComplete({
                            nextSyncToken: collection.nextSyncToken,
                        }),
                    ),
                ),
            ),
            catchError((err) => {
                console.log('error while syncing', err)
                return of(syncFailure())
            }),
        ),
    )
}
