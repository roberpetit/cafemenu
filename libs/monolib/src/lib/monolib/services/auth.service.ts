import { inject, Injectable } from '@angular/core'; 
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService  {
    
    private auth = inject(Auth);
    private userSubject = new BehaviorSubject<User | null>(null); 
    user$ = this.userSubject.asObservable();
    
    loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(this.auth, provider)
          .then(result => {
            const user = result.user;
            console.log('Usuario conectado:', result);
            this.userSubject.next(user);
          })
          .catch(err => console.error('Error login:', err));
      }

    logout() {
        this.userSubject.next(null);
        signOut(this.auth).then(() => console.log('Desconectado'));
    }
    

}