import { Injectable, OnDestroy } from '@angular/core';
import { onAuthStateChanged, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { setDoc, updateDoc } from 'firebase/firestore';

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
    if (!user.email) return;
    const adminDocRef = doc(this.firestore, 'admins', user.email);
    const adminSnap = await getDoc(adminDocRef);

    if (adminSnap.exists()) {
      const data = adminSnap.data();
      if (!data['uid']) {
        alert('Primer login admin, Bienvenido!');
        await updateDoc(adminDocRef, {
          uid: user.uid,
          updated: new Date(),
        });
      }
      this.isAdminSubject.next(true);
    } else {
      this.isAdminSubject.next(false);
    }
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const user = result.user;
        if (!user) return;
        this.userSubject.next(user);
        this.updateUserDoc(user);
      })
      .catch((err) => console.error('Error login:', err));
  }

  updateUserDoc(user: User): Promise<void> {
    const userRef = doc(this.firestore, 'users', user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      lastLogin: new Date(),
    };
    return setDoc(userRef, userData, { merge: true });
  }

  logout() {
    this.userSubject.next(null);
    signOut(this.auth).then(() => console.log('Desconectado'));
  }

  getDisplayName(): string {
    return (
      this.userSubject.value?.displayName ||
      this.userSubject.value?.email ||
      this.auth.currentUser?.displayName ||
      ''
    );
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    if (this.auth.currentUser) {
      this.checkAdminStatus(this.auth.currentUser);
      this.userSubject.next(this.auth.currentUser);
    }
    return this.userSubject.value !== null;
  }
}
