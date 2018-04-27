import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  data: any;
  newMovie(data){
    return this._http.post('/new', {title: data.title, reviewer: data.reviewer, star: data.star, review: data.review });
  }

  getMovies(){
    return this._http.get('/getMovies');
  }

  deleteMovie(x){
    return this._http.delete('/deleteMovie/'+x);
  }

  newReview(data){
    console.log(data)
    return this._http.put('/newReview/'+data._id, data)
  }
}
