import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  movie: any;
  id: any;
  ngOnInit() {
    this.id = this._httpService.data;
    console.log(this.id)
    this.movie = {_id: this.id._id, reviewer: "", star: "", review: "" }
  }

  movieAdd(){
    let obs = this._httpService.newReview(this.movie);
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
