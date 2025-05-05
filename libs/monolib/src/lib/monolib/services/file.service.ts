import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategory } from '../components/menu-list/menu-list.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable()
export class FileService {

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getFile(filePath: string): any {
    return this.http.get(filePath);
  }

  getMenu(): Observable<MenuCategory[]> {
    const menuRef = collection(this.firestore, 'menu');
    return collectionData(menuRef, { idField: 'id' }) as Observable<MenuCategory[]>;
  }

}
