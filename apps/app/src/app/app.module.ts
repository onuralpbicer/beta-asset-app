import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import {
    provideFirebaseApp,
    initializeApp,
    FirebaseOptions,
    getApp,
} from '@angular/fire/app'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import metaReducers from './reducers'
import {
    browserLocalPersistence,
    initializeAuth,
    provideAuth,
} from '@angular/fire/auth'
import { EquipmentTypesModule } from './equipment-types/equipment-types.module'

const firebaseOptions: FirebaseOptions = {
    apiKey: 'AIzaSyBuYSxXqEOR9Ewe7pVZGNUq2NtEHX6Iajw',
    appId: 'beta-asset-app',
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(firebaseOptions)),
        StoreModule.forRoot(
            {},
            {
                metaReducers,
                runtimeChecks: {
                    strictActionImmutability: true,
                    strictStateImmutability: true,
                },
            },
        ),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        provideAuth(() =>
            initializeAuth(getApp(), {
                persistence: browserLocalPersistence,
            }),
        ),
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
