import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { IonicModule, NavController } from '@ionic/angular'

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [IonicModule],
})
export class HomeComponent {
    constructor(
        private auth: AuthService,
        private navController: NavController,
    ) {}

    logout() {
        this.auth.logout().subscribe({
            next: () => {
                this.navController.navigateBack(['login'])
            },
        })
    }
}
