import { NgModule } from '@angular/core'
import {
    AuthPipeGenerator,
    canActivate,
    redirectLoggedInTo,
    redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'
import { RouterModule, Routes } from '@angular/router'

const redirectToLogin: AuthPipeGenerator = () =>
    redirectUnauthorizedTo(['login'])
const redirectToHome: AuthPipeGenerator = () => redirectLoggedInTo(['home'])

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((m) => m.LoginComponent),
        ...canActivate(redirectToHome),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.component').then((m) => m.HomeComponent),
        ...canActivate(redirectToLogin),
    },
    {
        path: 'equipments/:id',
        loadComponent: () =>
            import('./equipment-list/equipment-list.component').then(
                (m) => m.EquipmentListComponent,
            ),
        ...canActivate(redirectToLogin),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
