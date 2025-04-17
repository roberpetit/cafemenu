import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationComponent } from '@cafemenu-monorepo/monolib';
import { ThemeService } from '@cafemenu-monorepo/monolib';

@Component({
  standalone: true,
  imports: [NavigationComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);
  title = 'cafemenu';
  theme = this.themeService.theme;
}
