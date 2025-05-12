import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemEditDialogComponent } from '../menu-item-edit-dialog/menu-item-edit-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MenuItemConfirmationDialogComponent } from '../menu-item-confirmation-dialog/menu-item-confirmation-dialog.component';
import { MenuCategoryEditDialogComponent } from '../menu-category-edit-dialog/menu-category-edit-dialog.component';
import { MenuItemAddToCartDialogComponent, MenuItemAddToCartDialogData } from '../menu-item-add-to-cart-dialog/menu-item-add-to-cart-dialog.component';
import { CartService } from '../../services/cart.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { CategoryListComponent } from '../category-list/category-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


export interface MenuItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
}

export interface MenuCategory {
  id?: string;
  title: string;
  items: MenuItem[];
  opcionales?: string[];

  expanded?: boolean;
}

@Component({
  selector: 'lib-menu-list',
  templateUrl: './menu-list.component.html',
  standalone: true,
  imports: [MatIconModule, CategoryListComponent, MatButtonModule, DragDropModule, CommonModule, MatTooltipModule, MatExpansionModule, MatChipsModule, MatSlideToggleModule, FormsModule],
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  @Input() menuCategories: MenuCategory[] = [];
  @Input() canEdit!: boolean;
  
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<MenuCategory>();

  @Input() withCollapse = false;

  constructor(private dialog: MatDialog, private cartService: CartService) {}

  openEditItemDialog(index: number, menuCategory: MenuCategory) {
    const dialogRef = this.dialog.open(MenuItemEditDialogComponent, {
      width: '400px',
      data: { ...menuCategory.items[index] , isAddMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        menuCategory.items[index] = result;
        this.edit.emit(menuCategory);
      }
    });
  }

  dropCategory(event: CdkDragDrop<MenuCategory[]>) {
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
    console.log(event);
    // emit category order change   
  }

  drop(event: CdkDragDrop<MenuItem[]>, menuCategory: MenuCategory) {
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
    this.edit.emit(menuCategory);    
  }

  openAddNewItemDialog(menuCategory: MenuCategory) {
    const dialogRef = this.dialog.open(MenuItemEditDialogComponent, {
      width: '400px',
      data: { title: '', description: '', price: 0, id: crypto.randomUUID(), isAddMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        menuCategory.items.push(result);
        this.edit.emit(menuCategory);
      }
    });
  }
  
  openDeleteCategoryDialog(menuCategory: MenuCategory, index: number) {
    const dialogRef = this.dialog.open(MenuItemConfirmationDialogComponent, {
      data: {
        name: menuCategory.title,
        type: 'categoría'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDeleteCategory(index);
      }
    });
  }

  openDeleteItemDialog(index: number, menuCategory: MenuCategory) {
    const dialogRef = this.dialog.open(MenuItemConfirmationDialogComponent, {
      data: {
        name: menuCategory.items[index].title,
        type: 'item'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDeleteItem(index, menuCategory);
      }
    });
  }

  openEditCategoryNameDialog(menuCategory: MenuCategory) {
    const dialogRef = this.dialog.open(MenuCategoryEditDialogComponent, {
      width: '400px',
      data: { category: menuCategory, isAddMode: false }
    });
    dialogRef.afterClosed().subscribe((result: MenuCategory) => {
      if (result) {
        menuCategory.title = result.title;
        menuCategory.opcionales = result.opcionales;
        this.edit.emit(menuCategory);
      }
    });
  }

  confirmDeleteItem(index: number, menuCategory: MenuCategory) {
    menuCategory.items.splice(index, 1);
    this.edit.emit(menuCategory);
  }

  confirmDeleteCategory(index: number) {
    this.delete.emit(index);
  }

  openAddItemToCartDialog(index: number, menuCategory: MenuCategory) {
    const menuItemAddToCartDialogData: MenuItemAddToCartDialogData = {
      item: menuCategory.items[index],
      isAddMode: false,
      quantity: 1
    };

    const dialogRef = this.dialog.open(MenuItemAddToCartDialogComponent, {
      width: '400px',
      data: menuItemAddToCartDialogData
    });

    dialogRef.afterClosed().subscribe((result: MenuItemAddToCartDialogData) => {
      if (result) {
        this.cartService.addItem(result.item, result.quantity || 1);
        // this.category.items[index] = result.item; // add badge of amount in cart

      }
    });
  }

  expandCategory(category: MenuCategory) {
    this.menuCategories.forEach(cat => {
      if (cat !== category) {
        cat.expanded = false;
      }
    });
    category.expanded = !category.expanded;
  }
}