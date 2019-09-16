import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, timeout } from "rxjs/operators";

import { LoaderService } from '../services/loader.service';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(public loaderService: LoaderService,
        @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
        const timeoutValueNumeric = Number(timeoutValue);
        console.log("TCL: LoaderInterceptor -> constructor -> req", req)
        return next.handle(req).pipe(
            timeout(timeoutValueNumeric),
            finalize(() => {
                console.log("TCL: LoaderInterceptor -> @Inject -> req", req)
                this.loaderService.hide()
            })
        );
    }

}