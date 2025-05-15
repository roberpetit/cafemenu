// category.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, deleteDoc } from '@angular/fire/firestore';
import { MenuCategory } from '../components/menu-list/menu-list.component';
import { doc, orderBy, query, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<MenuCategory[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  collapsableView = signal(false); 

  private collectionRef;

  constructor(private firestore: Firestore) {
      this.collectionRef = collection(this.firestore, 'menu');
      this.loadCategories();
  }

  private loadCategories() {
    // Important. Subscription to the collection data. Should be the only one.
    const orderedQuery = query(this.collectionRef, orderBy('order'));
    collectionData(orderedQuery, { idField: 'id' }).subscribe((categories: any[]) => {
        this.categoriesSubject.next(categories);
        console.log('Categories loaded:', categories);
    });
  }

  getCurrentCategories(): MenuCategory[] {
    return this.categoriesSubject.getValue();
  }

  addCategory(category: MenuCategory): Promise<any> {
    const menuRef = collection(this.firestore, 'menu');
    return addDoc(menuRef, category);
  }

  editCategory(categoryId: string, category: any): Promise<any> {
    const docRef = doc(this.firestore, `menu/${categoryId}`);
    return updateDoc(docRef, category);
  }

  deleteCategory(categoryId: string) {
    const docRef = doc(this.firestore, `menu/${categoryId}`);
    return deleteDoc(docRef);
  }
}