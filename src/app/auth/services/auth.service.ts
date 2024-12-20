
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments.prod';
import { ApiResponse, User } from '../interfaces/user.interface';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';

  @Injectable({providedIn: 'root'})
  export class AuthService {
    private usernameSubject = new BehaviorSubject<string>('');
    username$ = this.usernameSubject.asObservable();


    private baseUrl = environment.baseUrl
    private username?: string;
    private isAdmin?:boolean;
    private isAuth?: boolean
    constructor(private httpClient: HttpClient) { }
    private claims!: any;
    get currentUser(): string{
      if(!this.username) return "";
      return structuredClone(this.username)
    }

    login(username: string, password: string ): Observable<string>{
      return this.httpClient.post<{ token: string }>(`${ this.baseUrl }/authentication/signin`,{username, password} )
      .pipe(
        map(response => response.token),
        tap(token => this.onLogin(token)), // Usa la propiedad `token` correctamente
        catchError(err => {
          console.error('Error durante el login:', err);
          throw err.error; // Propaga el error al componente para manejarlo allí
        })
      );
    }
    register (user: User) : Observable<string>{
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/authentication/signup`, user).pipe(
        catchError((err: ApiResponse) => {
          console.error('Error durante el registro:', err);
          return of(''); // Si ocurre un error en el registro, lo manejamos aquí
        }),
        switchMap(() => {
          // Si el registro es exitoso, se procede al login
          return this.login(user.username, user.password);
        })
      );
    }
    checkAuthentication(): boolean{
      const token = sessionStorage.getItem('token');
      if (!token) return false;

      try {
        const claims = JSON.parse(window.atob(token.split('.')[1]));
        const isExpired = claims.exp * 1000 < Date.now();
        if (isExpired) {
          this.logout();
          return false;
        }

        this.claims = claims;
        this.isAuth = true;
        this.isAdmin = claims.isAdmin;
        this.username = claims.sub;
        this.usernameSubject.next(claims.sub);
        return true;
      } catch (e) {
        console.error('Error parsing token:', e);
        this.logout();
        return false;
      }
    }

    onLogin (token: any) {
      this.claims = JSON.parse(window.atob(token.split(".")[1])) //el token se separa por puntos cabezera, claims, firma./viene en base 64->atob nos permite decodificar un script en base 64
      this.isAuth = true;
      this.isAdmin = this.claims.isAdmin;
      this.username = this.claims.sub;
      sessionStorage.setItem('login', JSON.stringify({
        isAuth: this.isAuth,
        isAdmin: this.isAdmin,
        username: this.username
      }));
      sessionStorage.setItem('token',token)
      this.usernameSubject.next(this.claims.sub);
    };
    logout() {
      this.username = undefined;
      this.isAuth = true;
      this.isAdmin = true;
      localStorage.clear();
      sessionStorage.clear();
    }
  }
