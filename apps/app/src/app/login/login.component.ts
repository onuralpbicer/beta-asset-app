import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth/auth.service'
import { isNil } from 'rambda'
import { AlertService } from '../alert/alert.service'
import { NavController } from '@ionic/angular'

@Component({
    selector: 'beta-asset-app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    })

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private alertService: AlertService,
        private navController: NavController,
    ) {}

    submit() {
        if (
            isNil(this.form.value.username) ||
            isNil(this.form.value.password)
        ) {
            return
        }

        this.auth
            .login(this.form.value.username, this.form.value.password)
            .subscribe({
                next: (value) => {
                    this.navController.navigateForward(['home'])
                },
                error: (error) => {
                    console.log(error)
                    this.alertService.showDangerToast(
                        'Could not log in. Please try again later',
                    )
                },
            })
    }
}
