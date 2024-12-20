import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments.prod';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse, CamioneroToSave, ResponseApiToChanges } from '../interface/camionero.interface';
import { EntidadResponse } from '../interface/entidad.interface';
import { ApiResponseList } from '../../camion/interfaces/camion.interface';

@Injectable({providedIn: 'root'})
export class CamioneroService {
    private baseUrl: string = environment.baseUrl;

    constructor(private httpClient: HttpClient) { }

    getPageableCamiones(pageNo: number = 0, pageSize: string = "10", sortBy: string = 'id', sortDir: string = 'asc'): Observable<ApiResponse> {
      const params = { pageNo, pageSize, sortBy, sortDir };
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/camionero`, { params });
    }
    deleteCamionero(id: number):Observable<boolean>{
      return this.httpClient.delete<ResponseApiToChanges>(`${this.baseUrl}/camionero/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      )
    }
    updateCamionero(id: number, camionero: CamioneroToSave): Observable<boolean> {
      return this.httpClient.put<ResponseApiToChanges>(`${this.baseUrl}/camionero/${id}`, camionero)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      )
    }

    saveCamionero(camionero: CamioneroToSave): Observable<ApiResponse> {
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/camionero`, camionero);
    }

    getEntidadList(): Observable<EntidadResponse>{
      return this.httpClient.get<EntidadResponse>(`${this.baseUrl}/entidad/allDTO`);
    }
    getCamionList(): Observable<ApiResponseList>{
      return this.httpClient.get<ApiResponseList>(`${this.baseUrl}/camion`);
    }

}
