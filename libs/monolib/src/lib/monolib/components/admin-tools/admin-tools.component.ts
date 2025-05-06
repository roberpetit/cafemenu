import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from '../../services/file.service';
import { AuthService } from '../../services/auth.service';
import { collection, getDocs, Firestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';

@Component({
  selector: 'lib-admin-tools',
  imports: [CommonModule, MatSnackBarModule, MatCardModule, MatButtonModule, CartPreviewComponent
  ],
  templateUrl: './admin-tools.component.html',
  styleUrl: './admin-tools.component.scss',
})
export class AdminToolsComponent {
  isAdmin = false;

  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private firestore: Firestore,
  ) {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin});
  }

  reload() {
    this.fileService.deleteAllAndReUploadFromJsonFile();
  }

  async downloadCategories() {
    const querySnapshot = await getDocs(collection(this.firestore, 'menu'));
    const categories: any[] = [];

    querySnapshot.forEach(doc => categories.push({ id: doc.id, ...doc.data() }));

    const blob = new Blob([JSON.stringify(categories, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'categories-backup.json';
    anchor.click();

    URL.revokeObjectURL(url);
  }
}
