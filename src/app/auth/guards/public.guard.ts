import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    const isAuthenticated = this.authService.checkAuthentication();
    if (isAuthenticated) {
      this.router.navigate(['./home']);
    }
    return !isAuthenticated;
  }


  canMatch(): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

}
