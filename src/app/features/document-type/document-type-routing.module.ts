import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListPageComponent } from './pages/list-page/list-page.component';
import { HomeComponent } from '../../shared/pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path: 'list', component: DocumentListPageComponent},
      {path: '**', redirectTo:'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypeRoutingModule { }
