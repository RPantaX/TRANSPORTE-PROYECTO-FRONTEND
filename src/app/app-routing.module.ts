import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path: 'entidad',
    loadChildren: ()=> import('./features/entidad/entidad.module').then(m=>m.EntidadModule),
  },
  {
    path: 'document-type',
    loadChildren: ()=> import('./features/document-type/document-type.module').then(m=>m.DocumentTypeModule),
  },
  {
    path: 'contributor-type',
    loadChildren: ()=> import('./features/contributor-type/contributor-type.module').then(m=>m.ContributorTypeModule),
  },
  {
    path: 'users',
    loadChildren: ()=> import('./features/users/users.module').then(m=>m.UsersModule),
  },
  {
    path:'404',
    component:Error404PageComponent,
  },
  {
    path:'home',
    component: HomeComponent
  },
  //pordefecto
  {
    path:'',
    redirectTo:'home',
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
