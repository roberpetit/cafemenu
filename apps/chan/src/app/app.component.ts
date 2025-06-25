import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { AuthService, ToolbarIconsComponent } from '@cafemenu-monorepo/monolib';
import { ThemeService } from '@cafemenu-monorepo/monolib';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, ToolbarIconsComponent
],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);
  title = 'chan';
  theme: WritableSignal<string>;
  
  constructor(
    private readonly themeService: ThemeService,
    public auth: AuthService,
    private readonly router: Router,

  ) {
    this.theme = this.themeService.theme;
    console.log('AppComponent initialized with theme:', this.theme());
  }

  instaClick(): void {
    window.open('https://www.instagram.com/chan/?hl=es', '_blank');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => {
        console.log("isHandset: ",  result);
        return result.matches;
      }),
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
    this.auth.loginWithGoogle();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
  
}
