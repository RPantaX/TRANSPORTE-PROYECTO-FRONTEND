import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    HomeComponent,
    Error404PageComponent
  ],
  exports:[
    Error404PageComponent
  ],
  imports: [
    PrimeNgModule,
    CommonModule

  ]
})
export class SharedModule { }
