import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NewItemComponent, NewTitleComponent } from '@cafemenu-monorepo/monolib';
import { MatCardModule } from '@angular/material/card';

export interface MenuItem {
  icon?: string;
  title: string;
  description: string;
  price?: number;
  page?: string;
}
@Component({
  selector: 'app-menu-crm',
  imports: [CommonModule, MatButtonModule, MatListModule, MatIconModule, FormsModule, NewItemComponent, 
    NewTitleComponent, MatCardModule],
  templateUrl: './menu-crm.component.html',
  styleUrl: './menu-crm.component.scss',
})
export class MenuCrmComponent {
  menuItem: MenuItem = {
    icon: '',
    title: '',
    description: '',
    price: 10000,
  }
  menuItems: MenuItem[] = [
    { icon: '', title: 'Croissant de queso parmesano, tomates deshidratados y huevos revueltos', description: 'Carne tomate y queso', price: 12340 },
    { icon: '', title: 'Titulo', description: 'Descripcion', price: 10000 },
  ];
  showNewItemForm = false;
  showNewTitleForm = false;
  editable = false;
  
  addNewItem(): void {
    this.showNewItemForm = true;
  }

  addNewTitle(): void {
    this.showNewTitleForm = true;
  }

  deleteItem(item: MenuItem): void {
    console.log('Delete item clicked');
  }

  editItem(item: MenuItem): void {
    console.log('Edit item clicked');
  }

  onItemAdded(item: MenuItem): void {
    if (item)
      this.menuItems.push(item);

    this.showNewItemForm = false;
    console.log('Item added:', item);
  }
  
  onTitleAdded(title: any): void {
    this.showNewTitleForm = false;
    
    console.log('title added:', title);
  }
}
