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
    combineLatest,
} from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { checkSync } from './contentful.actions'
import { ModalController } from '@ionic/angular'
import {
    Asset,
    CreateClientParams,
    Entry,
    SyncCollection,
    createClient,
} from 'contentful'
import { isNil, isEmpty } from 'rambda'
import { Storage } from '@ionic/storage-angular'
import { HttpClient } from '@angular/common/http'
import { blobToString } from '../util'
import { SyncModalComponent } from '../sync-modal/sync-modal.component'

const CONFIG: CreateClientParams = {
    space: 'v00lofp5qjmx',
    accessToken: '4Av2evmSsl_ZqurMdfVdX0RQry3fQGihm3h7JAa4nXI',
}

type EntryOrAsset<T> = Entry<T> | Asset

@Injectable()
export class ContentfulService {
    private client = createClient(CONFIG)

    private syncModal: HTMLIonModalElement | null = null

    constructor(
        private storage: Storage,
        private http: HttpClient,
        private modalController: ModalController,
    ) {
        this.modalController
            .create({
                component: SyncModalComponent,
            })
            .then((modal) => (this.syncModal = modal))
    }

    async dismissSyncModal() {
        await this.syncModal?.dismiss()
    }

    async showSyncModal() {
        await this.syncModal?.present()
    }

    checkForUpdate(nextSyncToken: string | null) {
        return from(
            this.client.sync({
                resolveLinks: false,
                ...(isNil(nextSyncToken)
                    ? { initial: true }
                    : { nextSyncToken }),
            }),
        )
    }

    private getId(entry: EntryOrAsset<unknown>) {
        return entry.sys.id
    }

    private async removeDeletedEntries(entries: Array<EntryOrAsset<unknown>>) {
        for (const entry of entries) {
            await this.storage.remove(this.getId(entry))
        }
    }

    private async storeChangedEntries(entries: Array<Entry<unknown>>) {
        for (const entry of entries) {
            await this.storage.set(
                this.getId(entry),
                JSON.stringify(entry.toPlainObject()),
            )
        }
    }

    cacheEntries(collection: SyncCollection) {
        return from(this.storeChangedEntries(collection.entries)).pipe(
            switchMap(() =>
                this.removeDeletedEntries(collection.deletedEntries),
            ),
        )
    }

    private async storeAsset(asset: Asset, blob: Blob, type: string) {
        const assetString = await blobToString(blob, type)
        return this.storage.set(this.getId(asset), assetString)
    }

    private fetchAssets(assets: Array<Asset>) {
        if (isEmpty(assets)) return of([])
        return combineLatest(
            assets
                .map((asset) => ({
                    ...asset,
                    file: this.getAssetFile(asset),
                }))
                .map(({ file, ...asset }) =>
                    this.http
                        .get(`https:${file.url}?w=${window.innerWidth}`, {
                            responseType: 'blob',
                        })
                        .pipe(
                            map((blob) =>
                                this.storeAsset(asset, blob, file.contentType),
                            ),
                        ),
                ),
        )
    }

    private getAssetFile(asset: Asset): Asset['fields']['file'] {
        const file = asset.fields.file as any
        return file.hasOwnProperty('en-US') ? file['en-US'] : file
    }

    cacheAssets(collection: SyncCollection) {
        return this.fetchAssets(collection.assets).pipe(
            switchMap(() =>
                this.removeDeletedEntries(collection.deletedAssets),
            ),
        )
    }
}
