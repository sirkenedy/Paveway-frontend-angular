import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthserviceService } from '../_services';
 
@Injectable()
export class httpSetHeaders implements HttpInterceptor {
    token:boolean;
    constructor(private Authservice : AuthserviceService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
 
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
 
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
 
        request = request.clone({ headers: request.headers.set('x-Requested-With','XMLHttpRequest') });

        this.token = this.Authservice.isLoggedIn();
        const currentUser = this.Authservice.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        if(isLoggedIn){
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
                }
              });
        }
 
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if ([401, 403].indexOf(error.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this.Authservice.logout();
                    localStorage.removeItem("currentuser");
                    location.reload(true);
                }

                let data = {};
                data = {
                    domain: error.status,
                    message: error.error.error
                };
                return throwError(error);
            }));
    }
}