/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MenuCategory, MenuItem } from '../components/menu-list/menu-list.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  constructor(private http: HttpClient, private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {}

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
        // Agregar nueva
        await addDoc(menuCollection, category);
        console.log(`Categoria agregada: ${category.title}`);
      }
    }
  
    this.snackBar.open('Categories re-uploaded!', 'Close', { duration: 3000 });
    console.log('Sincronización de menú completa');
  }

  async deleteAllAndReUploadFromJsonFile() {
    const data: MenuCategory[] = await firstValueFrom(this.http.get<any[]>('menu-data.json'));
    const menuCollection = collection(this.firestore, 'menu');
  
    // Eliminar todos los documentos existentes
    const existingDocs = await getDocs(menuCollection);
    const deletePromises = existingDocs.docs.map(docSnap => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);
    console.log('Todos los documentos anteriores eliminados');
  
    // Agregar los nuevos
    for (let i = 0; i < data.length; i++) {
      const category = data[i];
      category.items = category.items.map((item: MenuItem) => ({
        ...item,
        id: crypto.randomUUID()
      }));
      category.expanded = false;
      category.order = i;

      const docRef = doc(menuCollection, crypto.randomUUID());
      await setDoc(docRef, category);
      console.log('index:', i, 'element:', data[i]);
    }


    console.log('Categorías actualizadas con IDs únicos por ítem');
    
  }

}
