import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { GenericInterface, GenericInterfaceCreation } from '../interfaces/generic-interfaces';

export class BaseService<T extends GenericInterface, C extends GenericInterfaceCreation> {
  protected apiURL = environment.apiURL + `/${this.entityName}`;

  constructor(protected http: HttpClient, private entityName: string) { }

  public getAll(page?: number, elementsToShow?: number): Observable<HttpResponse<T[]>> {
    let params = new HttpParams();
    if (page) params = params.append('page', page.toString());
    if (elementsToShow) params = params.append('recordsPerPage', elementsToShow.toString());
    return this.http.get<T[]>(`${this.apiURL}`, { observe: 'response', params });
  }

  public create(entity: C) {
    return this.http.post(`${this.apiURL}`, entity);
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${id}`);
  }

  public update(id: number, entity: C): Observable<T> {
    return this.http.put<T>(`${this.apiURL}/${id}`, entity);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}