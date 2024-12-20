import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments.prod';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/document-type.interface';

@Injectable({providedIn: 'root'})
export class DocumentTypeService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/document-type`);
  }
  saveEntity(entity: DocumentType): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/document-type`, entity);
  }
}
