import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'beta-asset-app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class MaintenanceComponent {}
