import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service'
import{LocalStorageService} from 'ngx-webstorage';
import{UsersService} from '../users.service'
import {FormGroup, FormControl} from '@angular/forms'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  closeResult = '';
  updatedMovie;
  fullMovieList:any = [];
  updatedTitle = new FormGroup({
    title: new FormControl(''),
  })

  constructor(private movies:MoviesService, private localStorage:LocalStorageService , private user: UsersService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.movies.getFullMoviesList().subscribe(res => {
       this.fullMovieList = res
    })
  }

   // ----------------------method for delete movie-------------------------------

  deleteMovie(id){
    let retriveUser = this.localStorage.retrieve('user');
    retriveUser.movies_liked = retriveUser.movies_liked.filter (value => value != id)
   
    let newLocalStorageUser = {...retriveUser}
    delete retriveUser.id;
    delete retriveUser.isAuth;

    // movie service to delete movie
    this.movies.deleteMovie(id).subscribe(res =>{
       // user service to update user liked movie list
      this.user.updateLikedMovieList(newLocalStorageUser.id, retriveUser).subscribe(result=>{
        // update local storage with updated user liked movie array
        this.localStorage.store('user', newLocalStorageUser); 
        this.ngOnInit();
      })
    })
  }

   // ----------------------method for update movie title-------------------------------

  updateTitle(){
    this.modalService.dismissAll('Save click'); // close modal
    this.updatedMovie.title = this.updatedTitle.value.title;
    let movieID = this.updatedMovie.id;
    delete this.updatedMovie.id;
    this.movies.updateMovieTitle(movieID, this.updatedMovie).subscribe(res => {
      this.ngOnInit();
    });
    
  }

  // ----------------------methods for modal close and open-------------------------------
  open(content, movie) {
    // get current movie object to send to movie service. when click edit icon
    this.updatedMovie = movie 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    console.log('ok')
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
