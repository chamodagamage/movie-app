import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service'
import{LocalStorageService} from 'ngx-webstorage';
import{UsersService} from '../users.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  LikedMovielist:any = [];
  likedMovieIDList:any = [];
  constructor(private movies:MoviesService , private localStorage: LocalStorageService, private user: UsersService) { }

  ngOnInit(): void {
    this.likedMovieIDList = this.localStorage.retrieve('user').movies_liked;
    this.likedMovieIDList.forEach(element => {
      this.movies.getLikedMovieList(element).subscribe(res => {
        this.LikedMovielist.push(res[0])
      });
    });  
  }

  // ------------------------------Method to unlike movie----------------------------------
  unlikeMovie(id){
    
    let retriveUser = this.localStorage.retrieve('user'); 

    this.likedMovieIDList=  this.likedMovieIDList.filter(value => { 
      return value != id;
    });

    retriveUser.movies_liked = this.likedMovieIDList

    let newLocalStorageUser = {...retriveUser}
    delete retriveUser.id; // delete id from retrive user object
    delete retriveUser.isAuth; // delete isAuth from retrive user object

    //-----user service to update liked movie list-----
    this.user.updateLikedMovieList(newLocalStorageUser.id, retriveUser).subscribe(res=>{
      this.localStorage.store('user', newLocalStorageUser);
      window.location.reload()
    })
  }
  
}
