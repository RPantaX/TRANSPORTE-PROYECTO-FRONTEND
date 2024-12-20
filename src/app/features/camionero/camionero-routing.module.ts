import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../shared/pages/home/home.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
    {
      path:'',
      component:HomeComponent,
      children:[
        {path: 'list', component: ListPageComponent},
        {path: '**', redirectTo:'list'},
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamioneroRoutingModule { }
