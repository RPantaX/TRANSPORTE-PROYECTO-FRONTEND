import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean {
    const isAuthenticated = this.authService.checkAuthentication();
    if (!isAuthenticated) {
      this.router.navigate(['./auth/login']);
    }
    return isAuthenticated;

  }

  canActivate(): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }
  canMatch(): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }

}
