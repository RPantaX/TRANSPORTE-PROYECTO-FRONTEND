import { Component } from '@angular/core';
import { ApiResponse } from '../../interface/camionero.interface';
import { CamioneroService } from '../../service/camionero.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent {
  public responseApi: ApiResponse = {
    status: '',
    message: '',
    timestamp: new Date(),
    data: {
      responseCamioneroList: [],
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalElements: 0,
      end: true,
    },
    path: ''
  };



  constructor(
    private camioneroService: CamioneroService
  ) {}

  ngOnInit(): void {
    this.loadEntities();
  }

  loadEntities() {
    this.camioneroService.getPageableCamiones().subscribe((responseApi) => {
      this.responseApi = responseApi;
    });
  }
}
