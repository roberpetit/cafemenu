import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-admin-add-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatLabel,
    MatFormField,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    
  ],
  templateUrl: './admin-add-edit.component.html',
  styleUrl: './admin-add-edit.component.scss',
})
export class AdminAddEditComponent implements OnInit {
  form: FormGroup | any = null;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminAddEditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { isNew: boolean; name?: string; email?: string }
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      collapse: new FormControl(false),
      name: new FormControl(this.data?.name || '', [Validators.required]),
      email: new FormControl(
        { value: this.data?.email || '', disabled: !this.data.isNew },
        [Validators.required, Validators.email]
      ),
    });
  }

  save() {
    const { name } = this.form.value;
    const email = this.form.getRawValue().email;
    this.dialogRef.close({ name, email });
  }
}
