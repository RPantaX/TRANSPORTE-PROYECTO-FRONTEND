import { Component, OnInit } from '@angular/core';
import { ApiResponseList } from '../../interfaces/camion.interface';
import { CamionService } from '../../services/camion.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{
  public apiResponseList: ApiResponseList = {
    status: '',
    message: '',
    timestamp: new Date(),
    data: [],
    path: ''
  }
    constructor(
      private camionService: CamionService
    ) {}

    ngOnInit(): void {
      this.loadEntities();
    }

    loadEntities() {
      this.camionService.getCamionList().subscribe((responseApi) => {
        this.apiResponseList = responseApi;
      });
    }
}
