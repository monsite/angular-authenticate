import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authToken:TokenStorageService,private router:Router) {}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const token = this.authToken.IsLoggedIn()
      if(token) {
        return true
      } 
        this.router.navigate(['login'])
        return false

    
    }
  
}
