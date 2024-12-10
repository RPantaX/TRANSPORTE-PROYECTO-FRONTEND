import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../interfaces/contribuitor-type';
import { ContribuitorTypeService } from '../../services/contribuitor-type.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{
  public responseApi: ApiResponse = {
    status: '',
    message: '',
    timestamp: new Date(),
    data: [],
    path: ''
  }
  constructor(
    private contribuitorTypeService: ContribuitorTypeService,
  ) {}
  ngOnInit(): void {
    this.loadEntities();
  }
  loadEntities() {
    this.contribuitorTypeService.getAll().subscribe((responseApi) => {
      this.responseApi = responseApi;
    });
  }
}
