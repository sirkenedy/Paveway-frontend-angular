import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  endpoint: string = "http://127.0.0.1:8000/api/";
  token : string;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(body:User) {
    return this.http.post<User>(this.endpoint+'auth/signup', body)
    .pipe(map(user => {
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    return user;

    }));
  }

  login(body:User) {
    return this.http.post<User>(this.endpoint+'auth/signup', body)
    .pipe(map(user => {
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    return user;

    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn() :boolean{
    if(!localStorage.getItem('currentUser')){
      return false;
    }

    return true;

  }

  getUserValue(){
    return this.http.get<User>(this.endpoint+'userdetails')
    .pipe(map(user => {
      if(user){
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }
}
