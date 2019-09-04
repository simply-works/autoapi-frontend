import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (request.url === 'https://autoapi.auth.eu-west-2.amazoncognito.com/oauth2/token') {
            return next.handle(request);
        }
        if (request.url === 'https://autoapi.auth.eu-west-2.amazoncognito.com/logout') {
            return next.handle(request);
        }

        if (localStorage.getItem('currentUser')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')).access_token;
            if (currentUser) {
                request = request.clone({
                    headers: new HttpHeaders({
                        Authorization: `${currentUser}`,
                        'Content-Type': 'application/json'
                    })
                });
            }
        }


        return next.handle(request);
    }
}
