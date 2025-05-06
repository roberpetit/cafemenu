import { Route } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { AdminToolsComponent } from '@cafemenu-monorepo/monolib';

export const appRoutes: Route[] = [
    { path: '', component: MenuComponent },
    //{ path: 'menu', component: ImgMenuComponent },
    //{ path: 'menu/:pagina', component: ImgMenuComponent },
    { path: 'cafe', component: MenuComponent },
    { path: 'cafe/:pagina', component: MenuComponent },
    { path: 'admin', component: AdminToolsComponent },
    { path: '*', redirectTo: '', pathMatch: 'full' },
];
