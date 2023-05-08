import { Injectable } from '@angular/core'
import {
    Asset,
    CreateClientParams,
    Entry,
    SyncCollection,
    createClient,
} from 'contentful'
import { combineLatest, from, map, switchMap, tap } from 'rxjs'
import { isNil, isEmpty } from 'rambda'
import { Storage } from '@ionic/storage-angular'
import { HttpClient } from '@angular/common/http'
import { blobToString } from '../util'

const CONFIG: CreateClientParams = {
    space: 'v00lofp5qjmx',
    accessToken: '4Av2evmSsl_ZqurMdfVdX0RQry3fQGihm3h7JAa4nXI',
}

export enum IContentfulContent {
    EquipmentTypeList = '4Xi1mtiYcpKsR2ZKWLn9mN',
}

type EntryOrAsset<T> = Entry<T> | Asset

@Injectable({
    providedIn: 'root',
})
export class ContentfulService {
    private client = createClient(CONFIG)

    constructor(private storage: Storage, private http: HttpClient) {}

    private getEntryFields<T>(entry: EntryOrAsset<T>): T {
        const fieldsWithLocale = (entry?.fields as any) ?? {}
        return Object.entries(fieldsWithLocale).reduce(
            (acc, [key, value]: [string, any]) => {
                acc[key] = value.hasOwnProperty('en-US')
                    ? value['en-US']
                    : value

                return acc
            },
            {} as any,
        )
    }

    async getEntry<T>(id: string): Promise<Entry<T>> {
        const result = await this.storage.get(id)
        const entry = JSON.parse(result)
        const fields = this.getEntryFields(entry)
        return { ...entry, fields }
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

    async removeDeletedEntries(entries: Array<EntryOrAsset<unknown>>) {
        for (const entry of entries) {
            try {
                await this.storage.remove(this.getId(entry))
            } catch (error) {
                console.error('Could not delete entry', entry)
                console.log(error)
            }
        }
    }

    async storeChangedEntries(entries: Array<EntryOrAsset<unknown>>) {
        for (const entry of entries) {
            try {
                await this.storage.set(
                    this.getId(entry),
                    JSON.stringify(entry.toPlainObject()),
                )
            } catch (error) {
                console.error('Could not store entry', entry)
                console.log(error)
            }
        }
    }

    private getAssetFile(asset: Asset): Asset['fields']['file'] {
        const file = asset.fields.file as any
        return file.hasOwnProperty('en-US') ? file['en-US'] : file
    }

    private async storeAsset(asset: Asset, blob: Blob, type: string) {
        const assetString = await blobToString(blob, type)
        return this.storage.set(this.getId(asset), assetString)
    }

    cacheAssets(assets: Array<Asset>) {
        return combineLatest(
            assets
                .map((asset) => ({ ...asset, file: this.getAssetFile(asset) }))
                .map(({ file, ...asset }) =>
                    this.http
                        .get(`https:${file.url}?w=${window.innerWidth}`, {
                            responseType: 'blob',
                        })
                        .pipe(
                            switchMap((blob) =>
                                this.storeAsset(asset, blob, file.contentType),
                            ),
                        ),
                ),
        )
    }

    hasChange(collection: SyncCollection) {
        return !(
            isEmpty(collection.assets) &&
            isEmpty(collection.entries) &&
            isEmpty(collection.deletedEntries) &&
            isEmpty(collection.deletedAssets)
        )
    }
}
