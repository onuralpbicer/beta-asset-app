import { Injectable } from '@angular/core'
import { Auth, User, signInWithEmailAndPassword } from '@angular/fire/auth'

import { BehaviorSubject, from, map } from 'rxjs'

@Injectable()
export class AuthService {
    private authStateSubject = new BehaviorSubject<User | null>(null)

    public user$ = this.authStateSubject.asObservable()
    public isLoggedIn$ = this.user$.pipe(map((value) => !!value))

    constructor(private auth: Auth) {
        this.auth.onAuthStateChanged((credentials) => {
            this.authStateSubject.next(credentials)
        })
    }

    logout() {
        return from(this.auth.signOut())
    }

    login(username: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, username, password))
    }
}
