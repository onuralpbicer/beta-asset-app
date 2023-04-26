import { Component, EnvironmentInjector, OnInit } from '@angular/core'
import { AuthService } from './auth/auth.service'
import { Storage } from '@ionic/storage-angular'
@Component({
    selector: 'beta-asset-app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        public environmentInjector: EnvironmentInjector,
        private auth: AuthService,
        private storage: Storage,
    ) {}

    async ngOnInit() {
        await this.storage.create()
    }
}
