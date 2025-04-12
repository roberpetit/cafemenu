import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '@cafemenu-monorepo/monolib';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cafemenu';
}
