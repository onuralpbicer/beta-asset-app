import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs'
import { ContentfulService } from '../services/contentful.service'
import { SyncService } from '../services/sync.service'
import { RichTextDataTarget } from 'contentful'
import { ListPageListItem } from '../model'

interface IEquipmentType {
    name: string
    maintenanceTasks: string[]
    equipments: Array<RichTextDataTarget>
}

@Component({
    selector: 'beta-asset-app-equipment-list',
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class EquipmentListComponent implements OnInit {
    public loading = false
    public equipments: Array<ListPageListItem> = []

    constructor(
        private activatedRoute: ActivatedRoute,
        private contentfulService: ContentfulService,
        private syncService: SyncService,
    ) {}

    ngOnInit(): void {
        this.syncService.syncd$
            .pipe(
                switchMap(() =>
                    this.activatedRoute.params.pipe(
                        map((params) => params['equipmentTypeId']),
                    ),
                ),
            )
            .subscribe((id) => {
                this.loadEquipmentListForType(id)
            })
    }

    async loadEquipmentListForType(id: string) {
        this.loading = true

        const equipmentTypeWithLinks =
            await this.contentfulService.getEntry<IEquipmentType>(id)

        const list: ListPageListItem[] = []
        for (const link of equipmentTypeWithLinks.fields.equipments) {
            const equipment = await this.contentfulService.getEntry<
                Pick<ListPageListItem, 'name'>
            >(link.sys.id)
            list.push({ ...equipment.fields, id: equipment.sys.id })
        }

        this.equipments = list
        this.loading = false
    }
}
