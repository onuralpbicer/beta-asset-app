import { Injectable, inject } from '@angular/core'
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import {
    switchMap,
    catchError,
    of,
    tap,
    withLatestFrom,
    filter,
    map,
    delay,
    from,
} from 'rxjs'
import {
    cacheAssets,
    cacheEntries,
    cacheSuccess,
    checkSync,
    syncSuccess,
} from './contentful.actions'
import { ModalController } from '@ionic/angular'
import { ContentfulService } from './contentful.service'
import { IContentfulState, selectNextSyncToken } from './contentful.reducer'
import { Store } from '@ngrx/store'
import { Storage } from '@ionic/storage-angular'

@Injectable()
export class ContentfulEffects {
    constructor(
        private actions$: Actions,
        private modalController: ModalController,
        private service: ContentfulService,
        private store: Store<IContentfulState>,
        private storage: Storage,
    ) {}

    checkSyncStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(checkSync),
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
                this.service
                    .cacheEntries(collection)
                    .pipe(map(() => cacheAssets({ collection }))),
            ),
        ),
    )

    cacheAssets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cacheAssets),
            switchMap(({ collection }) =>
                this.service
                    .cacheAssets(collection)
                    .pipe(map(() => cacheSuccess())),
            ),
        ),
    )
}
