import { Component, OnInit } from '@angular/core';
import { ResponseEntidades } from '../../interfaces/entidad.interface';
import { EntidadService } from '../../services/entidad.service';

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



  constructor(
    private entidadService: EntidadService
  ) {}

  ngOnInit(): void {
    this.loadEntities();
  }

  loadEntities() {
    this.entidadService.getPageableEntities().subscribe((responseApi) => {
      this.responseApi = responseApi;
    });
  }
}
