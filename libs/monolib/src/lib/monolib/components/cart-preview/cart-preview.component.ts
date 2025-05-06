import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MenuItem } from '../menu-list/menu-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-cart-preview',
  imports: [DragDropModule, MatIconModule, MatButtonModule, DragDropModule, CommonModule, 
    MatTooltipModule, FormsModule, MatInputModule],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.scss',
})
export class CartPreviewComponent implements OnInit {
  cartItems: CartItem[] = [];
  observations = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => this.cartItems = items);
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.item.price || 0) * item.quantity, 0);
  }

  onQuantityChange(itemId: string, eventQuantity?: any) {
    console.log('onQuantityChange', itemId, eventQuantity);
    if (eventQuantity.target.valueAsNumber && eventQuantity.target.valueAsNumber > 0 && this.cartItems.find(item => item.item.id === itemId)) {
      const item = this.cartItems.find(cartItem => cartItem.item.id === itemId);
      if (item) {
        item.quantity = eventQuantity.target.valueAsNumber;
        console.log('item', item);
      }
      this.cartService.updateQuantity(itemId, eventQuantity.target.valueAsNumber);
    }
  }

  remove(itemId: string) {
    this.cartService.removeItem(itemId);
  }

  changeQty(itemId: string, newQuantity: number): void {
    const item = this.cartItems.find(cartItem => cartItem.item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, newQuantity);
    }
    this.cartService.updateQuantity(itemId, Math.max(1, newQuantity));
  }
  
  tags = ['Sin gluten', 'Sin lactosa', 'Vegano', 'Sin azucar', 'Sin sal', 'Sin cafeina', 'Sin alcohol', 'Sin frutos secos'];

  onObservationChange(itemId: string, value: string) {
    const updated = this.cartItems.map(c =>
      c.item.id === itemId ? { ...c, observations: value } : c
    );
    this.cartService['saveCart'](updated); // call internal save method
  }

  appendObservation(tag: string) {
    const existing = this.observations || '';
    const updatedText = existing.includes(tag)
      ? existing
      : (existing + ' ' + tag).trim();
      this.observations = updatedText;
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
  }

  confirmCart(): void {
    console.log('confirmCart', this.cartItems);
  }
}

