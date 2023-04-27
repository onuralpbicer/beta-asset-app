import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { IonicModule, NavController } from '@ionic/angular'
import { EquipmentTypesModule } from '../equipment-types/equipment-types.module'
import { Store } from '@ngrx/store'
import { initEquipmentTypes } from '../equipment-types/equipment-types.actions'

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [IonicModule, EquipmentTypesModule],
})
export class HomeComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private navController: NavController,
        private equipmentTypesStore: Store<any>,
    ) {}

    ngOnInit(): void {
        this.equipmentTypesStore.dispatch(initEquipmentTypes())
    }

    logout() {
        this.auth.logout().subscribe({
            next: () => {
                this.navController.navigateBack(['login'])
            },
        })
    }
}
