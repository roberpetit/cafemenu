
  
export interface CartItem {
  item: MenuItem;
  quantity: number;
  optionalSelections?: string[];
  observations?: string; 
}
  
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { MenuItem } from '../components/menu-list/menu-list.component';
import { AuthService } from './auth.service';
  
@Injectable({ providedIn: 'root' })
export class CartService {
    private cartKey = 'local_cart';
    private cart$ = new BehaviorSubject<CartItem[]>([]);
  
    constructor(private firestore: Firestore, private authService: AuthService) {
      this.loadCart();
    }
  
    getCart() {
      return this.cart$.asObservable();
    }
  
    private async loadCart() {
      const user = this.authService.getUser();
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
      const user = this.authService.getUser();
      if (user) {
        const docRef = doc(this.firestore, 'carts', user.uid);
        await setDoc(docRef, { items: cart });
      } else {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
      }
    }
  
    addItem(item: MenuItem, quantity: number) {
      const current = this.cart$.value;
      const index = current.findIndex(c => c.item.title === item.title);
      if (index > -1) {
        current[index].quantity+= quantity;
      } else {
        current.push({ item, quantity: quantity });
      }
      this.saveCart(current);
    }
  
    removeItem(itemId: string) {
      const updated = this.cart$.value.filter(c => c.item.id !== itemId);
      this.saveCart(updated);
    }
  
    clearCart() {
      this.saveCart([]);
    }
  
    updateQuantity(itemId: string, quantity: number) {
      const cart = this.cart$.value.map(c =>
        c.item.id === itemId ? { ...c, quantity } : c
      );
      this.saveCart(cart);
    }
  }
  