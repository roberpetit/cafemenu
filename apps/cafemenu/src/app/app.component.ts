import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationComponent } from '@cafemenu-monorepo/monolib';

@Component({
  standalone: true,
  imports: [NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/menu']);
  }
  title = 'cafemenu';
}
