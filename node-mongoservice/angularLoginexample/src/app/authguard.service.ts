import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _Router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const user = localStorage.getItem("user");
    if (user) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    //  location.href = myGlobal.loginURL;
    // this._Router.navigate(['/login']);
    this._Router.navigate(['/login']);

    //  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
