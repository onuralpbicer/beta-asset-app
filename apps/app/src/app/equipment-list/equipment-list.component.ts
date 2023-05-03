import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { EquipmentsModule } from '../equipments/equipments.module'
import { Store } from '@ngrx/store'
import { IEquipmentsState } from '../equipments/equipments.reducer'
import { initEquipments } from '../equipments/equipments.actions'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs'

@Component({
    selector: 'beta-asset-app-equipment-list',
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, EquipmentsModule],
})
export class EquipmentListComponent implements OnInit {
    constructor(
        private equipmentsStore: Store<IEquipmentsState>,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(map((params) => params['equipmentTypeId']))
            .subscribe((id) => {
                this.equipmentsStore.dispatch(initEquipments({ id }))
            })
    }
}
