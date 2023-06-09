import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { IonicModule, NavController } from '@ionic/angular'
import { ContentfulService } from '../services/contentful.service'
import { SyncService } from '../services/sync.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, from, map, switchMap, take } from 'rxjs'
import {
    IEquipmentBase,
    IEquipmentProperty,
    IEquipmentPropertyTypes,
} from '../model'
import { LoadingIconComponent } from '../loading-icon/loading-icon.component'
import { EquipmentPropertyComponent } from './equipment-property/equipment-property.component'
import { EquipmentService } from './equipment.service'
import {
    Storage,
    ref,
    list,
    listAll,
    StorageReference,
} from '@angular/fire/storage'
import { path } from 'rambda'

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

    public maintenances$!: Observable<Date[]>

    constructor(
        private activatedRoute: ActivatedRoute,
        private contentfulService: ContentfulService,
        private syncService: SyncService,
        private navController: NavController,
        private equipmentService: EquipmentService,
        private afStorage: Storage,
    ) {}

    ngOnInit(): void {
        const id$ = this.syncService.syncd$.pipe(
            switchMap(() =>
                this.activatedRoute.params.pipe(
                    map((params) => params['equipmentId']),
                ),
            ),
        )

        this.maintenances$ = id$.pipe(
            switchMap((id) =>
                from(this.fetchMaintenanceSummaries(id)).pipe(
                    map((paths) =>
                        paths.map((path) => {
                            const [, year, month, day, time] = path.split('/')
                            const [hour, min] = time
                                .replace('.json', '')
                                .split(':')

                            const date = new Date(
                                Number(year),
                                Number(month) - 1,
                                Number(day),
                                Number(hour),
                                Number(min),
                            )
                            return date
                        }),
                    ),
                ),
            ),
        )

        id$.subscribe((id) => {
            this.loadEquipment(id)
            this.fetchMaintenanceSummaries(id)
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

        this.loading = false
    }

    public async fetchMaintenanceSummaries(id: string) {
        const storageRef = ref(this.afStorage, id)

        const files: StorageReference[] = []

        // const result = await list(storageRef)
        async function fetchPrefix(ref: StorageReference) {
            const result = await listAll(ref)

            files.push(...result.items)

            if (result.prefixes.length) {
                for (const prefix of result.prefixes) {
                    await fetchPrefix(prefix)
                }
            }
        }

        await fetchPrefix(storageRef)

        return files.map((file) => file.fullPath)
    }
}
