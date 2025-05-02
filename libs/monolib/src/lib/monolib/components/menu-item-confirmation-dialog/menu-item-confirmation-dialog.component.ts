
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

export interface ConfirmDeleteData {
  name: string;
  type: 'item' | 'categoría';
}

@Component({
  selector: 'lib-menu-item-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './menu-item-confirmation-dialog.component.html'
})
export class MenuItemConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MenuItemConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteData
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}