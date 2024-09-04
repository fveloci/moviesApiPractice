import { Injectable } from '@angular/core';
import { BaseService } from './generic.service';
import { CinemaCreation, CinemaList } from '../interfaces/cinema';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService extends BaseService<CinemaList, CinemaCreation> {

  constructor(http: HttpClient) {
    super(http, 'cinemas')
  }
}
