import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
  selector: 'lib-menu-category',
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.scss',
})
export class MenuCategoryComponent {
  @Input() category!: MenuCategory;
  @Input() canEdit = false;
  
  @Output() addItem = new EventEmitter<void>();
  @Output() removeItem = new EventEmitter<number>();
  
  deleteItem(item: MenuItem): void {
    console.log('Delete item clicked');
  }

  editItem(item: MenuItem): void {
    console.log('Edit item clicked');
  }
}
