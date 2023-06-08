import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { IonicModule, NavController } from '@ionic/angular'
import { ContentfulService } from '../services/contentful.service'
import { SyncService } from '../services/sync.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, map, switchMap, take } from 'rxjs'
import {
    IEquipmentBase,
    IEquipmentProperty,
    IEquipmentPropertyTypes,
} from '../model'
import { LoadingIconComponent } from '../loading-icon/loading-icon.component'
import { EquipmentPropertyComponent } from './equipment-property/equipment-property.component'

@Component({
    selector: 'beta-asset-app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        LoadingIconComponent,
        EquipmentPropertyComponent,
    ],
})
export class EquipmentComponent implements OnInit {
    public loading = false

    public equipmentBase: IEquipmentBase | null = null

    public equipmentProperties: IEquipmentProperty[] = []

    public newMaintenanceLink$!: Observable<string>

    constructor(
        private activatedRoute: ActivatedRoute,
        private contentfulService: ContentfulService,
        private syncService: SyncService,
        private navController: NavController,
    ) {}

    ngOnInit(): void {
        const id$ = this.syncService.syncd$.pipe(
            switchMap(() =>
                this.activatedRoute.params.pipe(
                    map((params) => params['equipmentId']),
                ),
            ),
        )

        id$.subscribe((id) => {
            this.loadEquipment(id)
        })

        this.newMaintenanceLink$ = id$.pipe(
            map((id) => `/equipment/${id}/maintenance`),
        )
    }

    navigateToMaintenance(id?: string) {
        this.newMaintenanceLink$.pipe(take(1)).subscribe((link) => {
            this.navController.navigateForward(link + (id ? `/${id}` : ''))
        })
    }

    async loadEquipment(id: string) {
        this.loading = true
        this.equipmentBase = null
        this.equipmentProperties = []

        const equipmentWithLinks =
            await this.contentfulService.getEntry<IEquipmentBase>(id)

        this.equipmentBase = equipmentWithLinks.fields
        console.log(this.equipmentBase)

        this.equipmentProperties.push(
            {
                description: 'Cihaz adi',
                type: IEquipmentPropertyTypes.TEXT,
                textValue: this.equipmentBase.name,
            },
            {
                description: 'Cihaz Markasi',
                type: IEquipmentPropertyTypes.TEXT,
                textValue: this.equipmentBase.brand,
            },
            {
                description: 'Cihaz Mahali',
                type: IEquipmentPropertyTypes.TEXT,
                textValue: this.equipmentBase.location,
            },
            {
                description: 'Seri No',
                type: IEquipmentPropertyTypes.TEXT,
                textValue: this.equipmentBase.serialNumber,
            },
        )

        await Promise.all(
            equipmentWithLinks.fields.extraProperties.map(async (property) => {
                const entry =
                    await this.contentfulService.getEntry<IEquipmentProperty>(
                        property.sys.id,
                    )
                this.equipmentProperties.push(entry.fields)
            }),
        )

        console.log(this.equipmentProperties)

        this.loading = false
    }
}
