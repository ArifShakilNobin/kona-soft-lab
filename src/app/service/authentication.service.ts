import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../components/login/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<Login | null>;
  public currentUser: Observable<Login | null>;
  private isAuthenticated = false;
  private token: string | null = '';

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'dd4d819639705d332d531217b4f7c6b6';
    this.language = 'en-US';
    this.region = 'US';

    this.currentUserSubject = new BehaviorSubject<Login | null>(
      JSON.parse(localStorage.getItem('currentUserData') ? '{}': null)
    );
    this.currentUser = this.currentUserSubject.asObservable();    
  }


  getToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}authentication/token/new?api_key=${this.apiKey}`);
  }

  login(login:Login): Observable<any>{
    return this.http.post(`${this.baseUrl}authentication/token/validate_with_login?api_key=${this.apiKey}`, login);

  }

  public saveCurrentUserInfo(currentUserInfo: Login): void {
   
    this.currentUserSubject.next(currentUserInfo);
    localStorage.setItem('currentUserInfo', JSON.stringify(currentUserInfo));
    this.token = currentUserInfo.request_token;
    this.isAuthenticated = true;
  }

  get CurrentUserValue(): Login | null {
    return this.currentUserSubject.value;
  }

}
