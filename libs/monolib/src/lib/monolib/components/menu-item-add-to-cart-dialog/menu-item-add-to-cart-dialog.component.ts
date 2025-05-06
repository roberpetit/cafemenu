
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MenuItem } from '../menu-list/menu-list.component';

export interface MenuItemAddToCartDialogData 
  { 
    item: MenuItem, 
    isAddMode?: boolean,
    quantity?: number
   }
@Component({
  selector: 'lib-menu-item-add-to-cart-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './menu-item-add-to-cart-dialog.component.html'
})
export class MenuItemAddToCartDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuItemAddToCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuItemAddToCartDialogData) {}

  save() {
    this.dialogRef.close(this.data);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}