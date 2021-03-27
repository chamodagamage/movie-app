import { Injectable } from '@angular/core';
import{CanActivate} from '@angular/router'
import {LocalStorageService} from 'ngx-webstorage'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private localStorage:LocalStorageService, private route: Router) { }

  canActivate(): boolean {
    if(this.localStorage.retrieve('user') !== null){
      return true;
    }else{
      this.route.navigate(['']);
      return false;
    }

  }
}
