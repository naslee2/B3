import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  movies: any;
  avg: any;
  ngOnInit() {
    this.showMovies();
  }

  showMovies(){
    let x = this._httpService.getMovies();
    x.subscribe(data => {
      this.movies = data['data'];
      console.log(this.movies)
      // this.starAverage();
    })
  }

  starAverage(){
    console.log(this.movies);

    for(let x of this.movies){
      console.log(x)
      for(let y of x['review']){
        console.log(y)

      }
    } 
  }

  readReview(x){
    this._router.navigate(['/movies/'+x._id])
    this._httpService.data = x;
  }

  writeReview(x){
    this._router.navigate(['/movies/review/'+x._id])
    this._httpService.data = x;
  }
}
