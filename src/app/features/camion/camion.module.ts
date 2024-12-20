import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamionRoutingModule } from './camion-routing.module';
import { TableComponent } from './components/table/table.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    TableComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    CamionRoutingModule,
    PrimeNgModule,

    ReactiveFormsModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class CamionModule { }
