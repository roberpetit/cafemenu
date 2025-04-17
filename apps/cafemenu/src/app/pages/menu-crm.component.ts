import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemeService } from '@cafemenu-monorepo/monolib';


@Component({
  selector: 'app-menu-crm',
  imports: [CommonModule, MatDivider, MatButtonModule, MatListModule, MatIconModule, ],
  templateUrl: './menu-crm.component.html',
  styleUrl: './menu-crm.component.scss',
})
export class MenuCrmComponent {
  menuItems = [
    { icon: '', title: 'Hamburguesa clásica', description: 'Carne tomate y queso' },
    { icon: '', title: 'Carne', description: 'Descripcion' },
  ];

}
