import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { EquipmentTypesModule } from '../equipment-types/equipment-types.module'
import { Store } from '@ngrx/store'
import { initEquipmentTypes } from '../equipment-types/equipment-types.actions'
import { SideMenuComponent } from '../side-menu/side-menu.component'

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [IonicModule, EquipmentTypesModule, SideMenuComponent],
})
export class HomeComponent implements OnInit {
    public readonly contentId = 'main-page-content'

    constructor(private equipmentTypesStore: Store<any>) {}

    ngOnInit(): void {
        this.equipmentTypesStore.dispatch(initEquipmentTypes())
    }
}
