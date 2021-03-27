import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginPageComponent} from './login-page/login-page.component';
import {HomeComponent} from './home/home.component';
import{MoviesComponent} from './movies/movies.component'
import{AuthGuardService} from './auth-guard.service'



const routes: Routes = [
  {path:'home', component: HomeComponent, canActivate:[AuthGuardService]},
  {path:'movies', component: MoviesComponent,canActivate:[AuthGuardService]},
  { 
    path: '**', 
    component: LoginPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
