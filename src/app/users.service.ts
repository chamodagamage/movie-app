import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:3000/users';
  
  constructor(private http:HttpClient) { }

  getAuthentication(name,pwd){
    
     return this.http.get(`${this.url}?name=${name}&password=${pwd}`)
  }

  updateLikedMovieList(id, user){
    return this.http.put(`${this.url}/${id}`, user);
  }
}
