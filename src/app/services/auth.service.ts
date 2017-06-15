import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth/';

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post(this.BASE_URL + 'login', credentials)
              .map(res => res.json());
  }

}
