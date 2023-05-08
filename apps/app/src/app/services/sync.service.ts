import { Injectable } from '@angular/core'
import { ISyncState, ISyncStatus, selectSyncStatus } from '../sync/sync.reducer'
import { Store } from '@ngrx/store'
import { Observable, filter, map } from 'rxjs'
import { equals } from 'rambda'

@Injectable({
    providedIn: 'root',
})
export class SyncService {
    public syncd$!: Observable<boolean>

    constructor(private syncStore: Store<ISyncState>) {
        this.syncd$ = this.syncStore.select(selectSyncStatus).pipe(
            filter((syncStatus) => equals(syncStatus, ISyncStatus.Success)),
            map(() => true),
        )
    }
}
