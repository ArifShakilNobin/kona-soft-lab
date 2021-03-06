import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authenticationService.CurrentUserValue;
    console.log(user);
    
    // if (user?.id != null) {
    //   // check if route is restricted by role
    //   if (route.data.roles && route.data.roles.indexOf(user.roles) === -1) {
    //     // role not authorised so redirect to home page
    //     this.router.navigate(['/']);
    //     return false;
    //   }

    //   // authorised so return true
    //   return true;
    // }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
