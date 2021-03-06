import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OauthGuard implements CanActivate {

  isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"))

  canActivate(): boolean {
    return this.isAuthenticated;
  }
  
}
