import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth= false;
  constructor(private localStorage:LocalStorageService, private route: Router) {
    if(this.localStorage.retrieve('user') !== null){
      this.isAuth = true;
   }
  }

  ngOnInit(): void {

  }
  // -----------------------------Logout method--------------------------------
  logout(){
    this.localStorage.clear('user');
    location.reload();
    this.route.navigate(['']);
  }
 
}
