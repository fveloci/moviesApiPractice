import { Injectable } from '@angular/core';
import { authResponse, User, userCredentials } from '../interfaces/security';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  apiURL = environment.apiURL + '/accounts'
  private readonly tokenKey = 'token'
  private readonly expirationKey = 'token-expiration'
  private readonly roleKey = 'role'

  getUsers(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams()
    params = params.append('page', page)
    params = params.append('recordsPerPage', recordsPerPage.toString())
    return this.httpClient.get<User[]>(`${this.apiURL}/usersList`, { observe: 'response', params})
  }

  makeAdmin(userId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/makeAdmin`, JSON.stringify(userId), {headers})
  }

  removeAdmin(userId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/removeAdmin`, JSON.stringify(userId), {headers})
  }

  isLogged(): boolean {
    const token = localStorage.getItem(this.tokenKey)

    if(!token) return false

    const expiration = localStorage.getItem(this.expirationKey)
    let expirationDate = null
    if(expiration) expirationDate = new Date(expiration)

    if(expirationDate != null && expirationDate <= new Date()) {
      this.logout()
      return false;
    }

    return true
  }

  logout() {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.expirationKey)
    this.router.navigate(["/"])
  }

  getFieldJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey)
    if(!token) return ''
    let dataToken = JSON.parse(atob(token.split('.')[1]))
    return dataToken[field]
  }

  getRole(): string {
    return this.getFieldJWT(this.roleKey)
  }

  register(credentials: userCredentials): Observable<authResponse> {
    return this.httpClient.post<authResponse>(this.apiURL+'/create', credentials)
  }

  login(credentials: userCredentials): Observable<authResponse> {
    return this.httpClient.post<authResponse>(this.apiURL+'/login', credentials)
  }

  saveToken(authResponse: authResponse) {
    localStorage.setItem(this.tokenKey, authResponse.token)
    localStorage.setItem(this.expirationKey, authResponse.expiration.toString())
  }

  getToken() {
    return localStorage.getItem(this.tokenKey)
  }

}
