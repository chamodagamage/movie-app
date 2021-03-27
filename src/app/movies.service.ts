import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = 'http://localhost:3000/movies'
  movielist:any =[];
  constructor(private http:HttpClient) { }

  getLikedMovieList(id){
    return this.http.get(`${this.url}?id=${id}`)
  }

  getFullMoviesList(){
    return this.http.get(this.url)
  }

  deleteMovie(id){
    return this.http.delete(`${this.url}/${id}`)
  }

  updateMovieTitle(id, movie){
    return this.http.put(`${this.url}/${id}`, movie)
  }
}
