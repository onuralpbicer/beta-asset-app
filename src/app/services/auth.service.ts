import { Injectable } from '@angular/core'
import { Auth, User, signInWithEmailAndPassword } from '@angular/fire/auth'

import { BehaviorSubject, from } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authStateSubject = new BehaviorSubject<User | null>(null)

    public user$ = this.authStateSubject.asObservable()

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
