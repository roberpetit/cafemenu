import { Route } from '@angular/router';
import { ImgMenuComponent } from './pages/img-menu/img-menu.component';
import { MenuCrmComponent } from './pages/menu-crm/menu-crm.component';
import { MenuComponent } from './pages/menu/menu.component';

export const appRoutes: Route[] = [
    { path: '', component: ImgMenuComponent },
    { path: 'menu', component: ImgMenuComponent },
    { path: 'menu/:pagina', component: ImgMenuComponent },
    { path: 'modify', component: MenuCrmComponent },
    { path: 'cafe', component: MenuComponent },
];
