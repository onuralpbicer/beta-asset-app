import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { EquipmentTypesModule } from '../equipment-types/equipment-types.module'
import { Store } from '@ngrx/store'
import { initEquipmentTypes } from '../equipment-types/equipment-types.actions'
import { SideMenuComponent } from '../side-menu/side-menu.component'
import { Observable, map } from 'rxjs'
import {
    IEquipmentType,
    IEquipmentTypeListState,
    selectEquipmentList,
    selectEquipmentListViewStatus,
} from '../equipment-types/equipment-types.reducer'
import { ViewStatus } from '../model'
import { equals } from 'rambda'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        EquipmentTypesModule,
        SideMenuComponent,
    ],
})
export class HomeComponent implements OnInit {
    public readonly contentId = 'main-page-content'

    public equipmentTypeList$!: Observable<IEquipmentType[]>
    public loading$!: Observable<boolean>

    public readonly ViewStatus = ViewStatus

    constructor(private equipmentTypesStore: Store<IEquipmentTypeListState>) {}

    ngOnInit(): void {
        this.equipmentTypeList$ =
            this.equipmentTypesStore.select(selectEquipmentList)
        this.loading$ = this.equipmentTypesStore
            .select(selectEquipmentListViewStatus)
            .pipe(map((viewStatus) => equals(viewStatus, ViewStatus.Loading)))

        this.loadEquipmentTypes()
    }

    loadEquipmentTypes() {
        this.equipmentTypesStore.dispatch(initEquipmentTypes())
    }
}
