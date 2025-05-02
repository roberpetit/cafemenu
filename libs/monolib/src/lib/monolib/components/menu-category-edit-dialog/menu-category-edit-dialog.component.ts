
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-menu-category-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './menu-category-edit-dialog.component.html'
})
export class MenuCategoryEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuCategoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, isAddMode?: boolean }
  ) {}

  save() {
    this.dialogRef.close(this.data.title);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}