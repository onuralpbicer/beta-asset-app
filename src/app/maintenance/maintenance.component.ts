import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { LoadingIconComponent } from '../loading-icon/loading-icon.component'

@Component({
    selector: 'beta-asset-app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, LoadingIconComponent],
})
export class MaintenanceComponent {
    public loading = false
}
