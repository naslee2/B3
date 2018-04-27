import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  reviews: any;
  ngOnInit() {
    this.reviews = this._httpService.data;
    console.log(this.reviews)
  }

  deleteMovie(x){
    let obs = this._httpService.deleteMovie(x);
    obs.subscribe(data =>{
      if(data['message'] == 'Error'){
        console.log('error');
      }
      else{
        console.log('successful delete');
      }
    })

  }



}
