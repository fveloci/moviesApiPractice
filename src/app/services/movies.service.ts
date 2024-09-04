import { Injectable } from '@angular/core';
import { BaseService } from './generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LandingPage, MovieCreation, MoviePostGet, MoviePutGet, MovieView } from '../interfaces/movie';
import { Observable } from 'rxjs';
import { formatDate } from '../helpers/dateFunctions';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BaseService<MovieView, MovieCreation> {

  constructor(http: HttpClient) { 
    super(http, 'movies')
  }

  public postGet(): Observable<MoviePostGet> {
    return this.http.get<MoviePostGet>(`${this.apiURL}/postget`)
  }

  override create(movie: MovieCreation): Observable<number> {
    const formData = this.buildFormData(movie)
    return this.http.post<number>(this.apiURL, formData);
  }

  override update(id: number, entity: MovieCreation): Observable<MovieView> {
    const formData = this.buildFormData(entity);
    return this.http.put<MovieView>(`${this.apiURL}/${id}`, formData)
  }

  public filter(values: any): Observable<any> {
    const params = new HttpParams({fromObject: values})
    return this.http.get<MovieView[]>(`${this.apiURL}/filter`, { params, observe: 'response'})
  }

  public getLandingPage(): Observable<LandingPage> {
    return this.http.get<LandingPage>(this.apiURL);
  }

  public putGet(id: number): Observable<MoviePutGet> {
    return this.http.get<MoviePutGet>(`${this.apiURL}/putget/${id}`)
  }

  private buildFormData(movie: MovieCreation): FormData {
    const formData = new FormData()

    formData.append('title', movie.title)
    formData.append('resume', movie.resume)
    formData.append('trailer', movie.trailer)
    formData.append('onCinema', String(movie.onCinema))
    if (movie.releaseDate) formData.append('releaseDate', formatDate(movie.releaseDate))
    if (movie.poster) formData.append('poster', movie.poster)
    formData.append('genreIds', JSON.stringify(movie.genreIds))
    formData.append('cinemasIds', JSON.stringify(movie.cinemaIds))
    formData.append('actors', JSON.stringify(movie.actors))


    return formData
  }
}
