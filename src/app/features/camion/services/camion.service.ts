import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments.prod';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse, ApiResponseList, Camion } from '../interfaces/camion.interface';

@Injectable({providedIn: 'root'})
export class CamionService {
   private baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

    deleteCamion(id: number):Observable<boolean>{
      return this.httpClient.delete<ApiResponse>(`${this.baseUrl}/camion/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      )
    }
    updateCamion(id: number, camion: Camion): Observable<boolean> {
      return this.httpClient.put<ApiResponse>(`${this.baseUrl}/camion/${id}`, camion)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      )
    }

    saveCamion(camion: Camion): Observable<ApiResponse> {
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/camion`, camion);
    }
    getCamionList(): Observable<ApiResponseList>{
      return this.httpClient.get<ApiResponseList>(`${this.baseUrl}/camion`);
    }
}
