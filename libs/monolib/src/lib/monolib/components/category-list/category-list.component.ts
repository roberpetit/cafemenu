import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuCategory } from '../menu-list/menu-list.component';

@Component({
  selector: 'lib-category-list',
  imports: [MatIconModule, MatButtonModule, DragDropModule, CommonModule, MatTooltipModule, MatExpansionModule, MatChipsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  @Input() category!: MenuCategory;
  @Input() canEdit!: boolean;
  @Output() dropDrag = new EventEmitter<any>();
  @Output() openEditItemDialog = new EventEmitter<any>();
  @Output() openDeleteItemDialog = new EventEmitter<any>();
  @Output() openAddItemToCartDialog = new EventEmitter<any>();
}
