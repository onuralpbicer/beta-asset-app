import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { IonicModule, MenuController, NavController } from '@ionic/angular'
import { AuthService } from '../services/auth.service'

@Component({
    selector: 'beta-asset-app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class SideMenuComponent {
    @Input() contentId!: string

    constructor(
        private auth: AuthService,
        private navController: NavController,
        private menuController: MenuController,
    ) {}

    logout() {
        this.menuController.close()
        this.auth.logout().subscribe({
            next: () => {
                this.navController.navigateBack(['login'])
            },
        })
    }
}
