import { LOCALE_ID, NgModule } from '@angular/core'
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
import { FirestoreModule } from '@angular/fire/firestore'
import { SyncModule } from './sync/sync.module'
import { SyncEffects } from './sync/sync.effects'
import { IonicStorageModule } from '@ionic/storage-angular'
import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData } from '@angular/common'
import localeTR from '@angular/common/locales/tr'
registerLocaleData(localeTR)

const firebaseOptions: FirebaseOptions = {
    apiKey: 'AIzaSyBuYSxXqEOR9Ewe7pVZGNUq2NtEHX6Iajw',
    appId: 'beta-asset-app',
    storageBucket: 'gs://beta-asset-app.appspot.com',
    projectId: 'beta-asset-app',
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot({
            mode: 'ios',
        }),
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
        EffectsModule.forRoot([SyncEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        provideAuth(() =>
            initializeAuth(getApp(), {
                persistence: browserLocalPersistence,
            }),
        ),
        FirestoreModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        SyncModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: LOCALE_ID,
            useValue: 'tr-TR',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
