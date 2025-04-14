import { Route } from '@angular/router';
import { ImgMenuComponent } from './pages/img-menu.component';
import { MenuCrmComponent } from './pages/menu-crm.component';

export const appRoutes: Route[] = [
    { path: '', component: ImgMenuComponent },
    { path: 'menu', component: ImgMenuComponent },
    { path: 'menu/:pagina', component: ImgMenuComponent },
    { path: 'modify', component: MenuCrmComponent },
];
