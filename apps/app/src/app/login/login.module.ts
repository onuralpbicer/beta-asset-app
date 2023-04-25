import { NgModule } from '@angular/core'

import { IonicModule } from '@ionic/angular'

import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'
import { LoginRoutingModule } from './login-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthModule } from '@angular/fire/auth'

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        IonicModule,
        LoginRoutingModule,
        ReactiveFormsModule,
    ],
})
export class LoginModule {}
