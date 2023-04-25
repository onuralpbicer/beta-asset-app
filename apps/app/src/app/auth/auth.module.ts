import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    browserLocalPersistence,
    initializeAuth,
    provideAuth,
} from '@angular/fire/auth'
import { getApp } from '@angular/fire/app'
import { AuthService } from './auth.service'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        provideAuth(() =>
            initializeAuth(getApp(), {
                persistence: browserLocalPersistence,
            }),
        ),
    ],
    providers: [AuthService],
})
export class AuthModule {}
