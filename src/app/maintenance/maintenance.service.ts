import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IMaintenanceReport } from '../model'
import { AuthService } from '../services/auth.service'
import { Observable, map } from 'rxjs'
import { Storage, ref, uploadString } from '@angular/fire/storage'
import { NavController } from '@ionic/angular'

@Injectable({
    providedIn: 'root',
})
export class MaintenanceService {
    constructor(
        private authService: AuthService,
        private afStorage: Storage,
        private navController: NavController,
    ) {}

    private createMaintenanceJson(
        form: FormGroup,
        email: string,
        equipmentId: string,
    ): IMaintenanceReport {
        return {
            date: new Date(),
            user: email,
            equipmentId: equipmentId,
            type: form.value.type,
            tasks: form.value.maintenanceTasks,
        }
    }

    public sendMaintenance(form: FormGroup, equipmentId: string) {
        this.authService.getUserEmail().subscribe((email) => {
            if (!email) {
                return
            }

            const report = this.createMaintenanceJson(form, email, equipmentId)

            const date = report.date
            const r = ref(
                this.afStorage,
                `${equipmentId}/${date.getFullYear()}/${
                    date.getMonth() + 1
                }/${date.getDate()}/${date.getHours()}:${date.getMinutes()}.json`,
            )

            uploadString(r, JSON.stringify(report)).then(() => {
                this.navController.navigateBack(`/equipment/${equipmentId}`)
            })
        })
    }
}
