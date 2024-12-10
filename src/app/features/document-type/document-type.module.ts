import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRoutingModule } from './document-type-routing.module';
import { DocumentListPageComponent } from './pages/list-page/list-page.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocumentListPageComponent,
  ],
  imports: [
    CommonModule,
    DocumentTypeRoutingModule,

    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class DocumentTypeModule { }
