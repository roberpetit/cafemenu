import { Route } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';

export const appRoutes: Route[] = [
    { path: '', component: MenuComponent },
    //{ path: 'menu', component: ImgMenuComponent },
    //{ path: 'menu/:pagina', component: ImgMenuComponent },
    { path: 'cafe', component: MenuComponent },
    { path: 'cafe/:pagina', component: MenuComponent },
    { path: '*', redirectTo: '', pathMatch: 'full' },
];
