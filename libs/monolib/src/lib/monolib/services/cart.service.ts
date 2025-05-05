
  
  export interface CartItem {
    item: MenuItem;
    quantity: number;
    optionalSelections: string[];
  }
  
  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';
  import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
  import { Auth } from '@angular/fire/auth';
import { MenuItem } from '../components/menu-list/menu-list.component';
  
  @Injectable({ providedIn: 'root' })
  export class CartService {
    private cartKey = 'local_cart';
    private cart$ = new BehaviorSubject<CartItem[]>([]);
  
    constructor(private firestore: Firestore, private auth: Auth) {
      this.loadCart();
    }
  
    getCart() {
      return this.cart$.asObservable();
    }
  
    private async loadCart() {
      const user = this.auth.currentUser;
      if (user) {
        const docRef = doc(this.firestore, 'carts', user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          this.cart$.next(snap.data()['items'] || []);
          return;
        }
      }
      // fallback to localStorage
      const local = localStorage.getItem(this.cartKey);
      this.cart$.next(local ? JSON.parse(local) : []);
    }
  
    private async saveCart(cart: CartItem[]) {
      this.cart$.next(cart);
      const user = this.auth.currentUser;
      if (user) {
        const docRef = doc(this.firestore, 'carts', user.uid);
        await setDoc(docRef, { items: cart });
      } else {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
      }
    }
  
    addItem(item: MenuItem, optionalSelections: string[] = []) {
      const current = this.cart$.value;
      const index = current.findIndex(c => c.item.title === item.title);
      if (index > -1) {
        current[index].quantity++;
      } else {
        current.push({ item, quantity: 1, optionalSelections });
      }
      this.saveCart(current);
    }
  
    removeItem(itemId: number) {
      const updated = this.cart$.value.filter(c => c.item.id !== itemId);
      this.saveCart(updated);
    }
  
    clearCart() {
      this.saveCart([]);
    }
  
    updateQuantity(itemId: number, quantity: number) {
      const cart = this.cart$.value.map(c =>
        c.item.id === itemId ? { ...c, quantity } : c
      );
      this.saveCart(cart);
    }
  }
  