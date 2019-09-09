import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url === environment.awsmobile.tokenUrl) {
            return next.handle(request);
        }
        if (request.url === environment.awsmobile.logoutUrl) {
            return next.handle(request);
        }

        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                const refreshToken = JSON.parse(localStorage.getItem('currentUser')).refresh_token;
                this.authService.logout();
                // this.authService.getAuthToken(refreshToken, 'refresh_token', 'refresh_token').subscribe((res) => {
                //     localStorage.setItem('currentUser', JSON.stringify(res));
                //     this.authService.currentUserSubject.next(res);
                //     location.reload(true);
                //   }, error => {
                //     console.log('dfdshfkjdhf', error);
                //   });
            }
            // const error = err.error.message || err.statusText;
            // return throwError(error);
            return next.handle(request);
        }));
    }
}
