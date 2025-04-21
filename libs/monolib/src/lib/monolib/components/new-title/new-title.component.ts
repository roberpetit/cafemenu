
import { Component, EventEmitter, inject, Output } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'lib-new-title',
  templateUrl: './new-title.component.html',
  styleUrl: './new-title.component.scss',
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
export class NewTitleComponent {
  @Output() titleAdded = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  newTitleForm = this.fb.group({
    title: [null, Validators.required],
    description: null,
    page: null,
  });

  onSubmit(): void {
    if (this.newTitleForm.invalid) {
      return;
    }
    this.titleAdded.emit(this.newTitleForm.value);
    console.log(this.newTitleForm.value);
  }

  close(): void {
    this.titleAdded.emit(null);
  }
}
