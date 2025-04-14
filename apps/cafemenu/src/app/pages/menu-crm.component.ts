import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-crm',
  imports: [CommonModule, MatDivider, MatButtonModule],
  templateUrl: './menu-crm.component.html',
  styleUrl: './menu-crm.component.scss',
})
export class MenuCrmComponent {}
