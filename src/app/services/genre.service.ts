import { Injectable } from '@angular/core';
import { GenreCreation, GenreList } from '../interfaces/genre';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends BaseService<GenreList, GenreCreation> {

  constructor(http: HttpClient) { 
    super(http, 'genres')
  }

}
