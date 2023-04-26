import { Component, EnvironmentInjector } from '@angular/core'
import { AuthService } from './services/auth.service'
@Component({
    selector: 'beta-asset-app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
        public environmentInjector: EnvironmentInjector,
        private auth: AuthService,
    ) {}
}
