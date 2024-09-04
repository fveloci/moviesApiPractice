import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActorCreation, ActorList, ActorMovie } from '../interfaces/actor';
import { formatDate } from '../helpers/dateFunctions';
import { Observable } from 'rxjs';
import { BaseService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsService extends BaseService<ActorList, ActorCreation> {

  constructor(http: HttpClient) {
    super(http, 'actors')
  }

  override create(actor: ActorCreation) {
    const formData = this.buildFormData(actor)
    return this.http.post(`${this.apiURL}`, formData)
  }

  override update(id: number, entity: ActorCreation): Observable<ActorList> {
    const formData = this.buildFormData(entity)
    return this.http.put<ActorList>(`${this.apiURL}/${id}`, formData)
  }

  private buildFormData(actor: ActorCreation): FormData {
    const formData = new FormData();
    formData.append('name', actor.name)
    if(actor.biography) formData.append('biography', actor.biography)
    if(actor.birthDate) formData.append('birthDate', formatDate(actor.birthDate))
    if(actor.photo) formData.append('photo', actor.photo)

    return formData
  }

  public getByName(name: string): Observable<ActorMovie[]> {
    const headers = new HttpHeaders('Content-Type: application/json')
    return this.http.post<ActorMovie[]>(`${this.apiURL}/searchByName`, JSON.stringify(name), { headers })
  }
}
