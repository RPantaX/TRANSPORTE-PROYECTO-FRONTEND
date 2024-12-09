import { Component, Input, OnInit } from '@angular/core';
import { ResponseEntidades } from '../../interfaces/entidad.interface';
import { EntidadService } from '../../services/entidad.service';

@Component({
  selector: 'app-entidad-table',
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent implements OnInit{

  @Input()
  public responseApi!: ResponseEntidades

  constructor(private entidadService:EntidadService){};

  ngOnInit(): void {
    if(!this.responseApi) throw Error('responseApi is required');
  }

  onLazyLoad(event: any): void {
    var i = event.first / event.rows;
    const pageNo =  i ? i: 0
    const pageSize = event.rows;
    const sortBy = event.sortField || 'id';
    const sortDir = event.sortOrder === 1 ? 'asc' : 'desc';
    console.log(pageSize)
    this.entidadService.getPageableEntities(pageNo, pageSize, sortBy, sortDir)
      .subscribe((responseApi) => {
        this.responseApi = responseApi;
      });
  }


}
