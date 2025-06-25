import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, WritableSignal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { AuthService, CategoryService } from '@cafemenu-monorepo/monolib';
import { ThemeService } from '@cafemenu-monorepo/monolib';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);

  title = 'chan';
  theme: WritableSignal<string>;
  showCollapse: WritableSignal<boolean>;
  form = new FormGroup({
    collapse: new FormControl(false),
  });
  constructor(
    private readonly themeService: ThemeService,
    public auth: AuthService,
    public categoryService: CategoryService,
    private readonly router: Router,

  ) {
    this.theme = this.themeService.theme;
    this.showCollapse = this.categoryService.collapsableView;
    this.form.get('collapse')?.valueChanges.subscribe((value) => {
      this.categoryService.collapsableView.set(value ?? false);
    });
    this.form.get('collapse')?.setValue(false);
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

  what(): void {
    console.log('what', this.isHandset$);
  }
  
}
