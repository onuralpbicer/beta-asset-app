import { Component, OnInit } from '@angular/core'
import { AlertController, IonicModule, NavController } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { Observable, map } from 'rxjs'
import { equals } from 'rambda'
import { CommonModule } from '@angular/common'
import {
    ContentfulService,
    IContentfulContent,
} from '../services/contentful.service'
import { SyncService } from '../services/sync.service'
import { Link, RichTextDataTarget } from 'contentful'
import { ListPageListItem } from '../model'
import { AuthService } from '../services/auth.service'

interface EquipmentTypesList {
    equipmentTypes: Array<RichTextDataTarget>
}

@Component({
    selector: 'beta-asset-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class HomeComponent implements OnInit {
    public readonly contentId = 'main-page-content'

    public loading = false

    public equipmentTypes: Array<ListPageListItem> = []

    constructor(
        private contentfulService: ContentfulService,
        private syncService: SyncService,
        private navController: NavController,
        private auth: AuthService,
        private alertController: AlertController,
    ) {}

    ngOnInit(): void {
        this.syncService.syncd$.subscribe(() => {
            this.loadEquipmentTypes()
        })
    }

    async logout() {
        const alert = await this.alertController.create({
            header: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    role: 'cancel',
                    text: 'Cancel',
                },
                {
                    text: 'Logout',
                },
            ],
        })

        await alert.present()

        const { role } = await alert.onDidDismiss()

        if (role) {
            return
        }

        this.auth.logout().subscribe({
            next: () => {
                this.navController.navigateBack(['login'])
            },
        })
    }

    async loadEquipmentTypes() {
        this.loading = true
        const listWithLinks =
            await this.contentfulService.getEntry<EquipmentTypesList>(
                IContentfulContent.EquipmentTypeList,
            )

        const list: ListPageListItem[] = []

        for (const link of listWithLinks.fields.equipmentTypes ?? []) {
            const equipmentType = await this.contentfulService.getEntry<
                Pick<ListPageListItem, 'name'>
            >(link.sys.id)
            list.push({ ...equipmentType.fields, id: equipmentType.sys.id })
        }

        this.equipmentTypes = list
        this.loading = false
    }

    goToEquipmentType(equipmentType: ListPageListItem) {
        this.navController.navigateForward(['equipments', equipmentType.id])
    }
}
