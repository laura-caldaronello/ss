import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: SocialAuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const sessionUser = JSON.parse(sessionStorage.getItem('user') as string);
    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
