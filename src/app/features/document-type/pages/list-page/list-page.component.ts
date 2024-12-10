import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../interfaces/document-type.interface';
import { DocumentTypeService } from '../../services/document-type.service';

@Component({
  selector: 'app-type-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class DocumentListPageComponent implements OnInit{
  public responseApi: ApiResponse = {
    status: '',
    message: '',
    timestamp: new Date(),
    data: [],
    path: ''
  }
  constructor(
    private documentTypeService: DocumentTypeService,
  ) {}
  ngOnInit(): void {
    this.loadEntities();
  }
  loadEntities() {
    this.documentTypeService.getAll().subscribe((responseApi) => {
      this.responseApi = responseApi;
    });
  }
}
