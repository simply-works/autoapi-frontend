import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const url = `${environment.baseURL}/users`;
    return this.http.get<any>(url);
  }

  createUser(user: User): Observable<any> {
    const url = `${environment.baseURL}/users`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const payload = {
      user_id: 1,
      name: user.username,
      api_gateway_uri: 'testproject1.com',
      lambda_uri: 'lambdap1.com',
      vpc_name: 'testpff1'
    };
    return this.http.post<any>(url, payload, httpOptions);
  }

  deleteUser(user): Observable<any> {
    const url = `${environment.baseURL}/users/${user.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(url, httpOptions);
  }
}
