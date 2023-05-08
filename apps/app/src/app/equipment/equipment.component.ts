import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ContentfulService } from '../services/contentful.service'
import { SyncService } from '../services/sync.service'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs'
import { IEquipmentBase } from '../model'
import { LoadingIconComponent } from '../loading-icon/loading-icon.component'

@Component({
    selector: 'beta-asset-app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, LoadingIconComponent],
})
export class EquipmentComponent implements OnInit {
    public loading = false

    public equipmentName = ''

    public baseEquipment: IEquipmentBase | null = null

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
                        map((params) => params['equipmentId']),
                    ),
                ),
            )
            .subscribe((id) => {
                this.loadEquipment(id)
            })
    }

    async loadEquipment(id: string) {
        this.loading = true

        const equipmentWithLinks =
            await this.contentfulService.getEntry<IEquipmentBase>(id)

        console.log(equipmentWithLinks)
        this.baseEquipment = equipmentWithLinks.fields

        this.loading = false
    }
}
