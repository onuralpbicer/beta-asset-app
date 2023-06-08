import { Component, EnvironmentInjector, OnInit } from '@angular/core'
import { AuthService } from './services/auth.service'
import { Storage } from '@ionic/storage-angular'
import { ISyncState, ISyncStatus, selectSyncStatus } from './sync/sync.reducer'
import { Store } from '@ngrx/store'
import { delay, filter, switchMap, withLatestFrom } from 'rxjs'
import { equals } from 'rambda'
import { ModalController } from '@ionic/angular'
import { SyncModalComponent } from './sync-modal/sync-modal.component'

@Component({
    selector: 'beta-asset-app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public readonly SYNC_MODAL_ID = 'sync-modal'

    constructor(
        public environmentInjector: EnvironmentInjector,
        private auth: AuthService,
        private storage: Storage,
        private syncStore: Store<ISyncState>,
        private modalController: ModalController,
    ) {}

    async ngOnInit() {
        this.storage.create()

        const syncModal = await this.modalController.create({
            component: SyncModalComponent,
            id: this.SYNC_MODAL_ID,
        })

        this.auth.user$
            .pipe(
                filter(Boolean),
                switchMap(() =>
                    this.syncStore
                        .select(selectSyncStatus)
                        .pipe(
                            filter((syncStatus) =>
                                equals(syncStatus, ISyncStatus.Checking),
                            ),
                        ),
                ),
            )
            .subscribe(async (user) => {
                await syncModal.present()
            })

        this.auth.user$
            .pipe(
                filter(Boolean),
                switchMap(() =>
                    this.syncStore.select(selectSyncStatus).pipe(
                        filter((syncStatus) =>
                            equals(syncStatus, ISyncStatus.Success),
                        ),
                        delay(1000),
                    ),
                ),
            )
            .subscribe((user) => {
                syncModal.dismiss(null)
            })
    }
}
