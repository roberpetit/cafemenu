import { Component, inject, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-toolbar-icons',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar-icons.component.html',
  styleUrl: './toolbar-icons.component.scss',
})
export class ToolbarIconsComponent {
  @Input() instaUrl = 'https://www.instagram.com/chan/?hl=es';

  theme: WritableSignal<string>;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private readonly themeService: ThemeService,
    public auth: AuthService,
    private readonly router: Router
  ) {
    this.theme = this.themeService.theme;
    console.log('AppComponent initialized with theme:', this.theme());
  }

  instaClick(): void {
    window.open('https://www.instagram.com/chan/?hl=es', '_blank');
  }

  onThemeChange(): void {
    if (this.themeService.theme() === 'color-scheme-dark') {
      this.themeService.theme.set('color-scheme-light');
    } else {
      this.themeService.theme.set('color-scheme-dark');
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => {
        console.log('isHandset: ', result);
        return result.matches;
      }),
      shareReplay()
    );
  login(): void {
    this.auth.loginWithGoogle();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
