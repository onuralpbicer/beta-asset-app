import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IMaintenanceReport } from '../model'
import { AuthService } from '../services/auth.service'
import { NavController } from '@ionic/angular'
import { doc, getFirestore, setDoc } from '@angular/fire/firestore'
import { v4 as uuid } from 'uuid'
import { omit } from 'rambda'
import { FIRESTORE_COLLECTION_NAME } from '../util'

@Injectable({
    providedIn: 'root',
})
export class MaintenanceService {
    constructor(
        private authService: AuthService,
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

            const maintenanceId = uuid()

            const report = this.createMaintenanceJson(form, email, equipmentId)

            const document = doc(
                getFirestore(),
                FIRESTORE_COLLECTION_NAME,
                maintenanceId,
            )
            setDoc(document, {
                date: new Date(),
                user: email,
                equipmentId: equipmentId,
                type: form.value.type,
                tasks: form.value.maintenanceTasks.map((task: any) => ({
                    ...omit(['uygun'], task),
                    uygun: task.uygun === 'true',
                })),
            }).then(() => {
                this.navController.navigateBack(`/equipment/${equipmentId}`)
            })
        })
    }
}
