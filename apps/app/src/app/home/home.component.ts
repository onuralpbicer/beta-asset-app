import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { NavController } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { IContentfulState } from '../contentful/contentful.reducer'
import { checkSync } from '../contentful/contentful.actions'

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private navController: NavController,
        private contentfulStore: Store<IContentfulState>,
    ) {}

    ngOnInit(): void {
        this.contentfulStore.dispatch(checkSync())
    }

    logout() {
        this.auth.logout().subscribe({
            next: () => {
                this.navController.navigateBack(['login'])
            },
        })
    }
}
