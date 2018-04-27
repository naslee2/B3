import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { NewComponent } from './new/new.component';
import { ReviewComponent } from './review/review.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/movies' },
  { path: 'movies',component: MoviesComponent },
  { path: 'movies/new',component: NewComponent },
  { path: 'movies/:id',component: ViewComponent },
  { path: 'movies/review/:id',component: ReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
