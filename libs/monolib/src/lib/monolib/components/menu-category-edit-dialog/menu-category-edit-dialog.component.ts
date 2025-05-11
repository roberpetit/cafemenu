
import { CommonModule } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuCategory } from '../menu-list/menu-list.component';
import {
  MatSlideToggleModule
} from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-menu-category-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, 
    MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule ],
  templateUrl: './menu-category-edit-dialog.component.html'
})
export class MenuCategoryEditDialogComponent {

  isChecked = true;
  category: MenuCategory = { title: '', items: [], opcionales: [] };
  readonly keywords = signal([] as string[]);
  readonly formControl = new FormControl([]);

  constructor(
    public dialogRef: MatDialogRef<MenuCategoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: MenuCategory, isAddMode?: boolean }
  ) {
    if (data && data.category) {
      this.category = { ...data.category };
      this.keywords.set(this.category.opcionales || []);
    }
  }

  save() {
    this.dialogRef.close(this.category);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  changeEnableOpcionales(att: any): void {
    console.log(att);
    if (this.isChecked) {
      this.updateOpcionales([]);
      this.formControl.disable();
    } else {
      this.updateOpcionales(this.keywords());
      this.formControl.enable();
    }
  }
  
  removeKeyword(keyword: string) {
    this.keywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        this.updateOpcionales(keywords);
        return keywords;
      }

      keywords.splice(index, 1);
      this.updateOpcionales(keywords);
      return [...keywords];
    });
  }

  updateOpcionales(keywords: string[]) {
    this.category.opcionales = keywords;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.update(keywords => [...keywords, value]);
    }
    console.log(this.formControl.value);
    event.chipInput!.clear();
    this.updateOpcionales(this.keywords());
  }
  
}