import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from '../../services/file.service';
import { AuthService } from '../../services/auth.service';
import { collection, getDocs, Firestore, collectionData } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MenuCategory } from '../menu-list/menu-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AdminAddEditComponent } from '../admin-add-edit/admin-add-edit.component';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

export interface Admin {
  uid?: string;
  name: string;
  created: string;
  email: string;
  hidden?: boolean;
}
@Component({
  selector: 'lib-admin-tools',
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './admin-tools.component.html',
  styleUrl: './admin-tools.component.scss',
})
export class AdminToolsComponent implements OnInit {
  isAdmin = false;
  showAdminsPanel = false;
  admins$!: Observable<Admin[]>;

  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private firestore: Firestore,
    private dialog: MatDialog,
) {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnInit(): void {
    const adminsCol = collection(this.firestore, 'admins');
    this.admins$ = collectionData(adminsCol, { idField: 'email' }) as Observable<Admin[]>;
  }

  reload() {
    if (!confirm('¿Estás seguro de que deseas eliminar todas las categorias y volver a cargar desde la versión original?')) return;
    this.fileService.deleteAllAndReUploadFromJsonFile();
  }

  async downloadCategories() {
    const querySnapshot = await getDocs(collection(this.firestore, 'menu'));
    const categories: any[] = [];

    querySnapshot.forEach((doc) =>
      categories.push({ id: doc.id, ...doc.data() })
    );

    const blob = new Blob([JSON.stringify(categories, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'categories-backup.json';
    anchor.click();

    URL.revokeObjectURL(url);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json: Array<MenuCategory> = JSON.parse(reader.result as string);
        if (!Array.isArray(json)) {
          alert('El archivo no es un listado de categorías.');
          throw new Error('El archivo no es un array de categorías.');
        }
        this.fileService.deleteAllAndReUploadFromJsonFile(json); 
      } catch (err) {
        console.error('Error al leer el JSON:', err);
        alert('Archivo inválido. Asegúrate de que sea un backup JSON válido.');
      }
    };

    reader.readAsText(file);
  }
  
  addAdmin() {
    const dialogRef = this.dialog.open(AdminAddEditComponent, {
      data: { isNew: true }
    });
    dialogRef.afterClosed().subscribe(async (data: Admin) => {
      if (data?.email) {
      const ref = doc(this.firestore, `admins/${data.email}`);
        await setDoc(ref, {
          uid: '',
          name: data.name,
          email: data.email,
          created: new Date().toISOString()
        });
      }
    });
  }

  editAdmin(admin: Admin) {
    const dialogRef = this.dialog.open(AdminAddEditComponent, {
      data: { ...admin, isNew: false }
    });
    dialogRef.afterClosed().subscribe(async (data: Admin) => {
      if (data?.email) {
        const ref = doc(this.firestore, `admins/${data.email}`);
        await updateDoc(ref, {
          name: data.name
        });
      }
    });
  }

  deleteAdmin(email: string) {
    if (email === this.authService.getUser()?.email) {
      alert('No puedes eliminarte a ti mismo.');
      return;
    }
    if (!confirm('¿Estás seguro de que deseas eliminar este admin?')) return;
    const ref = doc(this.firestore, `admins/${email}`);
    deleteDoc(ref);
  }

  filterHiddenAdmins(admins: Admin[] | null): Admin[] {
    return admins?.filter(admin => !admin.hidden) || [];
  }
}
