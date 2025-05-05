import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MenuCategory } from '../components/menu-list/menu-list.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, doc, getDocs, setDoc } from 'firebase/firestore';

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
  
  async loadAndUploadMenuFromJsonFile() {
    const data: any[] = await firstValueFrom(this.http.get<any[]>('menu-data.json'));
    const menuCollection = collection(this.firestore, 'menu');
  
    // 1 Traer todas las categorías actuales de Firestore
    const existingSnapshot = await getDocs(menuCollection);
    const existingMap = new Map<string, string>(); // title -> docId
  
    existingSnapshot.forEach(docSnap => {
      const title = docSnap.data()['title'];
      if (title) {
        existingMap.set(title, docSnap.id);
      }
    });
  
    // 2 procesar cada categoría del archivo
    for (const category of data) {
      const docId = existingMap.get(category.title);
      if (docId) {
        // Sobrescribir existente
        const docRef = doc(this.firestore, 'menu', docId);
        await setDoc(docRef, category); // sobrescribe todo el doc
        console.log(`Categoria actualizada: ${category.title}`);
      } else {
        // ➕ Agregar nueva
        await addDoc(menuCollection, category);
        console.log(`Categoria agregada: ${category.title}`);
      }
    }
  
    console.log('Sincronización de menú completa');
  }

}
