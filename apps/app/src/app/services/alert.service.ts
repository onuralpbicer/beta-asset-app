import { Injectable } from '@angular/core'
import { AlertController, ToastController } from '@ionic/angular'

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(
        private alertController: AlertController,
        private toastController: ToastController,
    ) {}

    async showDangerToast(message: string) {
        const alert = await this.toastController.create({
            message,
            position: 'top',
            color: 'danger',
        })

        await alert.present()
    }

    async showToastWithOk(message: string) {
        const alert = await this.toastController.create({
            message,
            buttons: ['OK'],
            position: 'top',
        })

        await alert.present()
    }
}
