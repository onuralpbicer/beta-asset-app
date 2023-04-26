import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { switchMap, tap, withLatestFrom, map, of, delay } from 'rxjs'
import {
    cacheAssets,
    cacheEntries,
    cacheSuccess,
    checkSync,
    syncSuccess,
} from './contentful.actions'
import { ContentfulService } from './contentful.service'
import { IContentfulState, selectNextSyncToken } from './contentful.reducer'
import { Store } from '@ngrx/store'
import { isEmpty } from 'rambda'

@Injectable()
export class ContentfulEffects {
    constructor(
        private actions$: Actions,
        private service: ContentfulService,
        private store: Store<IContentfulState>,
    ) {}

    checkSyncStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(checkSync),
            tap(() => this.service.showSyncModal()),
            withLatestFrom(this.store.select(selectNextSyncToken)),
            switchMap(([, nextSyncToken]) =>
                this.service.checkForUpdate(nextSyncToken).pipe(
                    map((collection) => {
                        console.log(collection)
                        return syncSuccess({ collection })
                    }),
                ),
            ),
        ),
    )

    syncSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(syncSuccess),
            map(({ collection }) => cacheEntries({ collection })),
        ),
    )

    cacheEntries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cacheEntries),
            switchMap(({ collection }) =>
                !isEmpty(collection.entries) ||
                !isEmpty(collection.deletedEntries)
                    ? this.service
                          .cacheEntries(collection)
                          .pipe(map(() => cacheAssets({ collection })))
                    : of(cacheAssets({ collection })),
            ),
        ),
    )

    cacheAssets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cacheAssets),
            switchMap(({ collection }) =>
                !isEmpty(collection.assets) ||
                !isEmpty(collection.deletedAssets)
                    ? this.service.cacheAssets(collection).pipe(
                          map(() =>
                              cacheSuccess({
                                  nextSyncToken: collection.nextSyncToken,
                              }),
                          ),
                      )
                    : of(
                          cacheSuccess({
                              nextSyncToken: collection.nextSyncToken,
                          }),
                      ),
            ),
        ),
    )

    cacheSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(cacheSuccess),
                delay(1000),
                tap(() => this.service.dismissSyncModal()),
            ),
        { dispatch: false },
    )
}
