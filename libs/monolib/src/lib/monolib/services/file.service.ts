import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { MenuCategory } from '../components/menu-list/menu-list.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:3000/menu';

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getFile(filePath: string): any {
    return this.http.get(filePath);
  }

  saveFile(filePath: string, data: any): any {
    console.log('Saving file:', filePath, data);
    return of(null); 
    //return this.http.post(filePath, data, { responseType: 'text' });
  }

  getMenu(): Observable<MenuCategory[]> {
    const menuRef = collection(this.firestore, 'menu');
    return collectionData(menuRef, { idField: 'id' }) as Observable<MenuCategory[]>;
  }

  saveMenu(menu: MenuCategory[]): Observable<any> {
    return this.http.post(this.apiUrl, menu);
  }
  
  addCategory(category: MenuCategory): Promise<any> {
    const menuRef = collection(this.firestore, 'menu');
    return addDoc(menuRef, category);
  }

  deleteCategory(categoryId: string) {
    const docRef = doc(this.firestore, `menu/${categoryId}`);
    return deleteDoc(docRef);
  }

}
