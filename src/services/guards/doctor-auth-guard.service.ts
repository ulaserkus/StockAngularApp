import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class DoctorAuthGuardService {
  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem("jwt")
    const decodeUser = this.jwtHelper.decodeToken(token)
    
    if (token && !this.jwtHelper.isTokenExpired(token)&&decodeUser.role=="doctor") {
      return true
    }
    this.router.navigateByUrl('/')
    return false
  }



}
