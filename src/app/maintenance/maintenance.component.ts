import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { LoadingIconComponent } from '../loading-icon/loading-icon.component'
import { Storage, ref, uploadString } from '@angular/fire/storage'

@Component({
    selector: 'beta-asset-app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, LoadingIconComponent],
})
export class MaintenanceComponent {
    public loading = false

    constructor(private afStorage: Storage) {}

    public test() {
        const r = ref(this.afStorage, 'testing/test/test.jpg')

        uploadString(r, 'test123')
    }
}
