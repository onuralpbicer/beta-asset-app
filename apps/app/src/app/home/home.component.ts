import { Component, OnInit } from '@angular/core'
import { IonicModule, NavController } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { SideMenuComponent } from '../side-menu/side-menu.component'
import { Observable, map } from 'rxjs'
import { ViewStatus } from '../model'
import { equals } from 'rambda'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, SideMenuComponent],
})
export class HomeComponent implements OnInit {
    public readonly contentId = 'main-page-content'

    public loading$!: Observable<boolean>

    constructor(private navController: NavController) {}

    ngOnInit(): void {
        // this.equipmentTypeList$ =
        //     this.equipmentTypesStore.select(selectEquipmentList)
        // this.loading$ = this.equipmentTypesStore
        //     .select(selectEquipmentListViewStatus)
        //     .pipe(map((viewStatus) => equals(viewStatus, ViewStatus.Loading)))

        this.loadEquipmentTypes()
    }

    loadEquipmentTypes() {
        // this.equipmentTypesStore.dispatch(initEquipmentTypes())
    }
}
