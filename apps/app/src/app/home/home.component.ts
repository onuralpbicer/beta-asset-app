import { Component, OnInit } from '@angular/core'
import { IonicModule, NavController } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { SideMenuComponent } from '../side-menu/side-menu.component'
import { Observable, map } from 'rxjs'
import { ViewStatus } from '../model'
import { equals } from 'rambda'
import { CommonModule } from '@angular/common'
import {
    ContentfulService,
    IContentfulContent,
} from '../services/contentful.service'
import { SyncService } from '../services/sync.service'
import { Link, RichTextDataTarget } from 'contentful'

interface EquipmentTypesList {
    equipmentTypes: Array<RichTextDataTarget>
}

interface IEquipmentType {
    id: string
    name: string
}

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, SideMenuComponent],
})
export class HomeComponent implements OnInit {
    public readonly contentId = 'main-page-content'

    public loading = false

    public equipmentTypes: Array<IEquipmentType> = []

    constructor(
        private contentfulService: ContentfulService,
        private syncService: SyncService,
        private navController: NavController,
    ) {}

    ngOnInit(): void {
        this.syncService.syncd$.subscribe(() => {
            this.loadEquipmentTypes()
        })
    }

    async loadEquipmentTypes() {
        this.loading = true
        const listWithLinks =
            await this.contentfulService.getEntry<EquipmentTypesList>(
                IContentfulContent.EquipmentTypeList,
            )

        const list: IEquipmentType[] = []

        for (const link of listWithLinks.fields.equipmentTypes) {
            const equipmentType = await this.contentfulService.getEntry<
                Pick<IEquipmentType, 'name'>
            >(link.sys.id)
            list.push({ ...equipmentType.fields, id: link.sys.id })
        }

        this.equipmentTypes = list
        this.loading = false
    }

    goToEquipmentType(equipmentType: IEquipmentType) {
        this.navController.navigateForward(['equipments', equipmentType.id])
    }
}
