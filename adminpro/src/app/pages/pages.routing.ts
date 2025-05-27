import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { authCanLoadGuard, authGuard } from '../auth/login/guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate:[authGuard],
        canLoad:[authCanLoadGuard],
        loadChildren: () => import('./child-routes.module').then(module => module.ChildRoutesModule)
    },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }