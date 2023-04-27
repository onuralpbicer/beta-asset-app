import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'beta-asset-app-equipment-list',
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class EquipmentListComponent {}
