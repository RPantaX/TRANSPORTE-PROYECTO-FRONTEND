import { Component, OnInit } from '@angular/core';
import { ResponseEntidades, ResponseEntidadList } from '../../interfaces/entidad.interface';
import { EntidadService } from '../../services/entidad.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { TaxpayerType, TaxpayerTypeResponse } from '../../interfaces/taxpayer-type.interface';
import { DocumentType } from '../../interfaces/document-type.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: []
})
export class ListPageComponent implements OnInit{
  public responseApi: ResponseEntidades = {
    status: '',
    message: '',
    timestamp: new Date(),
    data: {
      responseEntidadList: [],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalElements: 0,
      end: true,
    },
    path: ''
  };

  entityDialog: boolean = false;

  constructor(
    private entidadService: EntidadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadEntities();
  }

  openNew() {
    this.entityDialog = true;
  }

  hideDialog() {
    this.entityDialog = false;
  }

  loadEntities() {
    this.entidadService.getPageableEntities().subscribe((responseApi) => {
      this.responseApi = responseApi;
    });
  }
}
