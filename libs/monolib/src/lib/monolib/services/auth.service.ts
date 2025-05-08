import { Injectable, OnDestroy } from '@angular/core'; 
import { onAuthStateChanged, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    
    private userSubject = new BehaviorSubject<User | null>(null); 
    user$ = this.userSubject.asObservable();

    private isAdminSubject = new BehaviorSubject<boolean>(false);
    isAdmin$ = this.isAdminSubject.asObservable();
      
    constructor(private firestore: Firestore, private auth: Auth) {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.checkAdminStatus(user);
            } else {
                this.userSubject.next(null);
                this.isAdminSubject.next(false);
            }
        });
    }

    ngOnDestroy(): void {
        this.logout();
    }
      
    private async checkAdminStatus(user: User) {
        const adminDocRef = doc(this.firestore, 'config', 'admins');
        const adminSnap = await getDoc(adminDocRef);
    
        if (adminSnap.exists()) {
            const uids = adminSnap.data()['uids'];
            this.isAdminSubject.next(Array.isArray(uids) && uids.includes(user.uid));
        } else {
            this.isAdminSubject.next(false);
        }
    }
      
    loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(this.auth, provider)
          .then(result => {
            const user = result.user;
            this.updateCart(user.uid);
            this.userSubject.next(user);
          })
          .catch(err => console.error('Error login:', err));
      }

      updateCart(uid: string) {
        const cartRef = doc(this.firestore, 'carts', uid);
        getDoc(cartRef).then((docSnap) => {
            if (!docSnap.exists()) {
                // Si el carrito no existe, puedes crear uno nuevo o manejarlo como desees
                console.log('Carrito no existe, creando uno nuevo...');
            } else {
                console.log('Carrito ya existe:', docSnap.data());
            }
        });
    }

    logout() {
        this.userSubject.next(null);
        signOut(this.auth).then(() => console.log('Desconectado'));
    }
    
    getDisplayName(): string {
        return this.userSubject.value?.displayName || this.userSubject.value?.email || this.auth.currentUser?.displayName || '';
    }

    isAdmin(): boolean {
        return this.isAdminSubject.value;
    }

    getUser(): User | null {
        return this.userSubject.value;
    }

    isLoggedIn(): boolean {
        if (this.auth.currentUser) {
            this.userSubject.next(this.auth.currentUser);
        }
        return this.userSubject.value !== null;
    }
}