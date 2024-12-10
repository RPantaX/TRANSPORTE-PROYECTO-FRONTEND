import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributorTypeRoutingModule } from './contributor-type-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    ContributorTypeRoutingModule,

    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class ContributorTypeModule { }
