// category.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { MenuCategory } from '../components/menu-list/menu-list.component';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<MenuCategory[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  private collectionRef;

  constructor(private firestore: Firestore) {
      this.collectionRef = collection(this.firestore, 'menu');
      this.loadCategories();
  }

  private loadCategories() {
    collectionData(this.collectionRef, { idField: 'id' }).subscribe((categories: any[]) => {
        this.categoriesSubject.next(categories);
        console.log('Categories loaded:', categories);
    });
  }

  getCurrentCategories(): MenuCategory[] {
    return this.categoriesSubject.getValue();
  }

  async updateCategory(categoryId: string, updatedCategory: Partial<MenuCategory>) {
    const docRef = doc(this.firestore, 'menu', categoryId);
    await updateDoc(docRef, updatedCategory);
  }

  async updateCategoryItems(categoryId: string, items: any[]) {
    return this.updateCategory(categoryId, { items });
  }
}