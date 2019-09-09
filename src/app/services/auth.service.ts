import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private accessToken: string;
  private userloggedIn: boolean;
  private userDetails: any = {};

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.userloggedIn = false;
    this.accessToken = '';
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(user: any): Observable<User> {
    if (user.email !== '' && user.password !== '') {
      user.token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc
      3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NjI1ODEyMDMsImV4cCI6MTU2
      MjU4MjQyMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmN
      vbSIsInVzZXJuYW1lIjoiaGVtYW50X2Nob3VoYW4iLCJuYW1lIjoiSGVtYW50IENob3VoYW4iLCJl
      bWFpbCI6ImhlbWFudEB5b3BtYWlsLmNvbSJ9.Z-PJ7VAmNrqwBYfdRzqSB9BWZIBFh6FfCuU-Zvb9LOc`;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['list-project']);
      return user;
    }
  }

  // login(email: string, password: string) {
  //     return this.http.post<any>(`${environment.baseURL}/users/authenticate`, { email, password })
  //         .pipe(map(user => {
  //             // login successful if there's a jwt token in the response
  //             if (user && user.token) {
  //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
  //                 localStorage.setItem('currentUser', JSON.stringify(user));
  //                 this.currentUserSubject.next(user);
  //             }

  //             return user;
  //         }));
  // }

  logout() {
    // remove user from local storage to log user out
    const URL = `${environment.awsmobile.domain}/logout?client_id=${environment.awsmobile.aws_user_pools_web_client_id}&logout_uri=${environment.awsmobile.logoutUrl}`;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.assign(URL);

  }

  getAll() {
    return this.http.get<User[]>(`${environment.baseURL}/users`);
  }

  getById(id: number) {
    return this.http.get(`${environment.baseURL}/users/${id}`);
  }

  signup(user: User) {
    // return this.http.post(`${environment.baseURL}/users/signup`, user);
    return user;
  }

  update(user: User) {
    return this.http.put(`${environment.baseURL}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.baseURL}/users/${id}`);
  }
  // authenticateCongnito(data): Observable<any> {
  //   // Defining an rxjs subject so as to emit after recieving the response
  //   const authResult = new Subject<any>();
  //   // Add the User details to amazon cognito sdk
  //   const CogAuthData = new AuthenticationDetails(data);
  //   // Create a user pool with cliend id and secret key
  //   // const CogUserPool = new CognitoUserPool(environment.cognitoPool);
  //   // Instantiate an cognito user with details and pool information
  //   // const CogUser = new CognitoUser({
  //   //   // Username: data.Username,
  //   //   // Pool: CogUserPool
  //   // });
  //   // Authenticate the cognito user with information
  //   CogUser.authenticateUser(CogAuthData, {
  //     onSuccess: result => {
  //       // on success send it to subject so that it will emit the success
  //       authResult.next(result);
  //     },
  //     onFailure: err => {
  //       // on failure send it to suvject so that will emit the error
  //       authResult.error(err);
  //     }
  //   });
  //   // Handling the final Observable
  //   return authResult.asObservable();
  // }
  // Set accesstoken data
  set setAccessToken(value: string) {
    this.accessToken = value;
  }
  // set Logged in user data
  set userLoggedIn(value: boolean) {
    this.userloggedIn = value;
  }
  // get user Logged in data
  get userLoggedIn(): boolean {
    return this.userloggedIn;
  }
  // set user details
  set UserDetails(value: any) {
    this.userDetails = value;
  }
  // set user Details
  get UserDetails(): any {
    return this.userDetails;
  }

  // signIn(user: User) {
  //   // const userPool = new CognitoUserPool(environment);
  //   const authDetails = new AuthenticationDetails({
  //     Username: user.username,
  //     Password: user.password
  //   });
  //   const cognitoUser = new CognitoUser({
  //     Username: user.username,
  //     Pool: userPool
  //   });
  //   cognitoUser.authenticateUser(authDetails, {
  //     onSuccess: (result) => {
  //       console.log(`access token = ${result.getAccessToken().getJwtToken()}`);
  //     },
  //     onFailure: (err) => {
  //       alert(err);
  //     }
  //   });
  // }

  getAuthToken(code, grantType, type) {
    const url = `${environment.awsmobile.tokenUrl}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic NDNiMDgzYXVib3JsZHQ5MGh2YjA4cGVmdGg6bGZqdjRsZ2Q1a203OXBhc2hsODd1anUwcWpjYTlvYjlwdHF1MjY3c29zdGkza2J2NWc3`
      })
    };
    const body = new HttpParams()
      .set('grant_type', grantType)
      .set('client_id', environment.awsmobile.aws_user_pools_web_client_id)
      .set(`${type}`, code)
      .set('redirect_uri', environment.awsmobile.redirectUrl);

    return this.http.post<any>(url, body.toString(), httpOptions);
  }
}
