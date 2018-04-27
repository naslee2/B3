import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  movie: any;
  error: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.movie = {title: "", reviewer: "", star: "", review: "" }
  }

  movieAdd(){
    console.log(this.movie)
    let obs = this._httpService.newMovie(this.movie);
    obs.subscribe(data =>{
      if(data['message'] == 'Error'){
        // this.error = "Invalid Name"
        console.log("error", data)
      }
      else{
        this._router.navigate(['/movies']);
      }
    })
  }

}
