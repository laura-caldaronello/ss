import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${apiUrl}/user/` + email);
  }

  setUser(user: SocialUser): Observable<User> {
    return this.http.post<User>(`${apiUrl}/user`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }
}
