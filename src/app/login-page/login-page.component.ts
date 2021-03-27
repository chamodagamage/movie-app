import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import{UsersService} from '../users.service'
import {LocalStorageService} from 'ngx-webstorage'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers:[UsersService]
})
export class LoginPageComponent implements OnInit {

  loginData = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private users:UsersService , private localStorage:LocalStorageService, private route: Router ) { }

  ngOnInit(): void {

  }

  // -------------------------------login method------------------------------------------
  userLogin(){
    this.users.getAuthentication(this.loginData.value.name , this.loginData.value.password )
    .subscribe(res => {
       if(Object.keys(res).length == 1){

         // save user data in local storage if user exist
         this.localStorage.store('user', {...res[0],'isAuth':true}); 
         this.route.navigate(['home']).then(() => window.location.reload());
         
       }else{
         alert('wrong user name or password')
       }
    })
  }
}
