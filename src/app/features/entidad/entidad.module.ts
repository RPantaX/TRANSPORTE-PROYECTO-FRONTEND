import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadRoutingModule } from './entidad-routing.module';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    ListPageComponent,
    NewPageComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    EntidadRoutingModule,
    PrimeNgModule,

    ReactiveFormsModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class EntidadModule { }
