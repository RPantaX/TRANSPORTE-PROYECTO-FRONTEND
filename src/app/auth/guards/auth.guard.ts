import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }

}
