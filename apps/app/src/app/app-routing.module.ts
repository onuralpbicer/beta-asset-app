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
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginModule),
        ...canActivate(redirectToHome),
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
        ...canActivate(redirectToLogin),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
