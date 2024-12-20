import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments.prod';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/contribuitor-type';

@Injectable({providedIn: 'root'})
export class ContribuitorTypeService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/taxpayer-type`);
  }
  saveEntity(entity: DocumentType): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/taxpayer-type`, entity);
  }
}
