import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from "@angular/material/tooltip";
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'lib-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatTooltipModule,
  ],
  providers: [ThemeService]
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  theme;
  
  constructor(private readonly themeService: ThemeService, public auth: AuthService, public categoryService: CategoryService) {
    this.theme = this.themeService.theme;
  }

  instaClick(): void {
    window.open('https://www.instagram.com/santoscafe___/?hl=es', "_blank");
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  onThemeChange(): void {
    if (this.themeService.theme() === 'color-scheme-dark') {
      this.themeService.theme.set('color-scheme-light');
    } else {
      this.themeService.theme.set('color-scheme-dark');
    }
  }

  login(): void {
    this.auth.loginWithGoogle()
  }
  
  logout(): void {
    this.auth.logout()
  }

}
