import { Route } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { AdminToolsComponent, CartPreviewComponent, FlyerComponent } from '@cafemenu-monorepo/monolib';

export const appRoutes: Route[] = [
    { path: '', component: MenuComponent },
    //{ path: 'menu', component: ImgMenuComponent },
    //{ path: 'menu/:pagina', component: ImgMenuComponent },
    { path: 'cafe', component: MenuComponent },
    { path: 'cafe/:pagina', component: MenuComponent },
    { path: 'cart', component: CartPreviewComponent },
    { path: 'admin', component: AdminToolsComponent },
    { path: 'flyer', component: FlyerComponent },
    { path: '*', redirectTo: '', pathMatch: 'full' },
];
