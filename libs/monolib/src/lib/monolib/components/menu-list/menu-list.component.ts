import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemEditDialogComponent } from '../menu-item-edit-dialog/menu-item-edit-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MenuItemConfirmationDialogComponent } from '../menu-item-confirmation-dialog/menu-item-confirmation-dialog.component';

export interface MenuItem {
  title: string;
  description?: string;
  price?: number;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
  opcionales?: MenuItem[];
}

@Component({
  selector: 'lib-menu-list',
  templateUrl: './menu-list.component.html',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, DragDropModule, CommonModule, MatTooltipModule],
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  @Input() category: MenuCategory = { title: '', items: [] };
  @Input() canEdit!: boolean;
  
  @Output() delete = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<MenuCategory>();

  constructor(private dialog: MatDialog) {}

  openEditItemDialog(index: number) {
    const dialogRef = this.dialog.open(MenuItemEditDialogComponent, {
      width: '400px',
      data: { ...this.category.items[index] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.category.items[index] = result;
      }
    });
  }

  openAddNewItemDialog() {
    const dialogRef = this.dialog.open(MenuItemEditDialogComponent, {
      width: '400px',
      data: { title: '', description: '', price: 0, isAddMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.category.items.push(result);
        this.edit.emit(this.category);
      }
    });
  }

  drop(event: CdkDragDrop<MenuItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.edit.emit(this.category);
    
  }

  openDeleteCategoryDialog() {
    const dialogRef = this.dialog.open(MenuItemConfirmationDialogComponent, {
      data: {
        name: this.category.title,
        type: 'categoría'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDeleteCategory();
      }
    });
  }

  openDeleteItemDialog(index: number) {
    const dialogRef = this.dialog.open(MenuItemConfirmationDialogComponent, {
      data: {
        name: this.category.items[index].title,
        type: 'item'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDeleteItem(index);
      }
    });
  }

  confirmDeleteItem(index: number) {
    this.category.items.splice(index, 1);
    this.edit.emit(this.category);
  }

  confirmDeleteCategory() {
    this.delete.emit(true);
  }
}