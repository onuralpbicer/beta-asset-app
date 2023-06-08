import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { ISyncState, ISyncStatus, selectSyncStatus } from '../sync/sync.reducer'
import { Observable, map } from 'rxjs'
import { CommonModule } from '@angular/common'
import { includes } from 'rambda'

@Component({
    selector: 'beta-asset-app-sync-modal',
    templateUrl: './sync-modal.component.html',
    styleUrls: ['./sync-modal.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule],
})
export class SyncModalComponent implements OnInit {
    syncStatus$!: Observable<ISyncStatus>
    isLoading$!: Observable<boolean>

    SyncStatus = ISyncStatus

    constructor(private syncStore: Store<ISyncState>) {}

    ngOnInit(): void {
        this.syncStatus$ = this.syncStore.select(selectSyncStatus)

        this.isLoading$ = this.syncStatus$.pipe(
            map((status) =>
                includes(status, [ISyncStatus.Checking, ISyncStatus.Syncing]),
            ),
        )

        this.syncStatus$.subscribe((syncStatus) => {
            console.log(syncStatus)
        })
    }
}
