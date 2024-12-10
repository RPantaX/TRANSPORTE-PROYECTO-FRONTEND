import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';
import { EntityToSave, ResponseApiToChanges, ResponseEntidades } from '../interfaces/entidad.interface';

import { environment } from '../../../../environments/environments';
import { TaxpayerTypeResponse } from '../interfaces/taxpayer-type.interface';
import { DocumentTypeResponse } from '../interfaces/document-type.interface';



@Injectable({providedIn: 'root'})
export class EntidadService {

  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getPageableEntities(pageNo: number = 0, pageSize: string = "10", sortBy: string = 'id', sortDir: string = 'asc'): Observable<ResponseEntidades> {
    const params = { pageNo, pageSize, sortBy, sortDir };
    return this.httpClient.get<ResponseEntidades>(`${this.baseUrl}/entidad`, { params });
  }
  deleteEntity(id: number):Observable<boolean>{
    return this.httpClient.delete<ResponseApiToChanges>(`${this.baseUrl}/entidad/${id}`)
    .pipe(
      catchError(err => of(false)),
      map(resp => true)
    )
  }
  updateEntity(id: number, entity: EntityToSave): Observable<boolean> {
    return this.httpClient.put<ResponseApiToChanges>(`${this.baseUrl}/entidad/${id}`, entity)
    .pipe(
      catchError(err => of(false)),
      map(resp => true)
    )
  }

  saveEntity(entity: EntityToSave): Observable<ResponseEntidades> {
    return this.httpClient.post<ResponseEntidades>(`${this.baseUrl}/entidad`, entity);
  }
  getDocumentTypeList(): Observable<DocumentTypeResponse>{
    return this.httpClient.get<DocumentTypeResponse>(`${this.baseUrl}/document-type`);
  }
  getTaxpayerTypeList(): Observable<TaxpayerTypeResponse>{
    return this.httpClient.get<TaxpayerTypeResponse>(`${this.baseUrl}/taxpayer-type`);
  }


}
