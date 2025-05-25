import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public dialog: MatDialog) {}

  openDialog(component: any, data?: any) {
    return this.dialog.open(component, {
      width: '400px',
      data: data,
    });
  }

  
}
