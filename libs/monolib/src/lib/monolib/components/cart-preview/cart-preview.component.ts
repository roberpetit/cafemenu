import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'lib-cart-preview',
  imports: [CommonModule],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.scss',
})
export class CartPreviewComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => this.cartItems = items);
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.item.price || 0) * item.quantity, 0);
  }

  onQuantityChange(itemId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(itemId, quantity);
    }
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId);
  }
}

