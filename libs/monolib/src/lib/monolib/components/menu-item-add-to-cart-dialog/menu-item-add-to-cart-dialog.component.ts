
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-menu-item-add-to-cart-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './menu-item-add-to-cart-dialog.component.html'
})
export class MenuItemAddToCartDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuItemAddToCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string; price: number, isAddMode?: boolean,
      quantity?: number
     }
  ) {}

  save() {
    this.dialogRef.close(this.data);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}