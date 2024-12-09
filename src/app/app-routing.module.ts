import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ]
  },
  {
    path: 'entidad',
    loadChildren: ()=> import('./features/entidad/entidad.module').then(m=>m.EntidadModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: 'document-type',
    loadChildren: ()=> import('./features/document-type/document-type.module').then(m=>m.DocumentTypeModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: 'contributor-type',
    loadChildren: ()=> import('./features/contributor-type/contributor-type.module').then(m=>m.ContributorTypeModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: 'users',
    loadChildren: ()=> import('./features/users/users.module').then(m=>m.UsersModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path:'404',
    component:Error404PageComponent,
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  //pordefecto
  {
    path:'',
    redirectTo:'auth',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'404',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
