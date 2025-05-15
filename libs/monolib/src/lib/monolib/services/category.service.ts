// category.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, deleteDoc } from '@angular/fire/firestore';
import { MenuCategory } from '../components/menu-list/menu-list.component';
import { doc, orderBy, query, updateDoc, writeBatch } from 'firebase/firestore';

export interface BatchWrite {
  op: 'set' | 'update' | 'delete' | 'add';
  path: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<MenuCategory[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  collapsableView = signal(false); 

  private collectionRef;



  private queue: BatchWrite[] = [];
  private debounceDelay = 300; // milliseconds
  private scheduled = false;

  
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

  addCategory(category: MenuCategory): void {
    this.add('menu', category);
  }

  editCategory(categoryId: string, category: any): void {
    this.update(`menu/${categoryId}`, category);
  }

  deleteCategory(categoryId: string): void {
    this.delete(`menu/${categoryId}`);
  }

  
  add(path: string, data: any): void {
    this.queue.push({ op: 'add', path, data });
  }

  set(path: string, data: any) {
    this.queue.push({ op: 'set', path, data });
    this.scheduleFlush();
  }

  update(path: string, data: any) {
    this.queue.push({ op: 'update', path, data });
    this.scheduleFlush();
  }

  delete(path: string) {
    this.queue.push({ op: 'delete', path });
    this.scheduleFlush();
  }

  private scheduleFlush() {
    if (!this.scheduled) {
      this.scheduled = true;
      timer(this.debounceDelay).subscribe(() => this.flush());
    }
  }

  private async flush() {
    if (this.queue.length === 0) {
      this.scheduled = false;
      return;
    }

    const batch = writeBatch(this.firestore);
    for (const write of this.queue) {
      const ref = doc(this.firestore, write.path);
      switch (write.op) {
        case 'add':
        case 'set':
          batch.set(ref, write.data);
          break;
        case 'update':
          batch.update(ref, write.data);
          break;
        case 'delete':
          batch.delete(ref);
          break;
      }
    }

    await batch.commit();
    this.queue = [];
    this.scheduled = false;
  }
}