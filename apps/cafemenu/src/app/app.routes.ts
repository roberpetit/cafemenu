import { Route } from '@angular/router';
import { ImgMenuComponent } from './pages/img-menu.component';

export const appRoutes: Route[] = [
    { path: 'menu', component: ImgMenuComponent },
    { path: 'menu/:pagina', component: ImgMenuComponent },
];
