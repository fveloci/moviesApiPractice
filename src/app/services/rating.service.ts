import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }
  apiURL = environment.apiURL + '/rating'

  rate(movieId: number, points: number) {
    return this.httpClient.post(this.apiURL, {movieId, points})
  }
}
