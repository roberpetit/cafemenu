
import { Component, EventEmitter, inject, Output } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'lib-new-item',
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class NewItemComponent {
  @Output() itemAdded = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  newItemForm = this.fb.group({
    title: [null, Validators.required],
    description: null,
    price: 3000,
    page: null,
  });

  onSubmit(): void {
    if (this.newItemForm.invalid) {
      return;
    }
    this.itemAdded.emit(this.newItemForm.value);
    console.log(this.newItemForm.value);
  }
}
