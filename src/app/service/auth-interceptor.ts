import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

/** Servicios */
import { AuthService } from './auth.service';

// Parametros
import { environment } from '../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    /** Constructor */
    constructor(private _authService: AuthService,
        private injector: Injector) { }

    /** Intercept
     * @param req
     * @param next */
    intercept(req: any, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers: any;

        //Valida si son los JSON
        if (req.url.includes('.json')) {
            headers = req.clone({
                setHeaders: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                }
            });
            return next.handle(headers);
        }

        //Valida si son los  assets
        if (req.url.includes('assets')) {
            // Response
            return next.handle(req).pipe(
                catchError(error => throwError(error))
            );
        }

        req.url = environment.url + '/' + req.url;

        const uploadFile = req.url.toLowerCase().includes('upload');
        if (this._authService.session) {
            const contentType = !uploadFile ? { 'content-type': 'application/json' } : {};
            headers = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + this._authService.token, ...contentType, } });
        } else {
            if (!uploadFile) { headers = req.clone({ setHeaders: { 'content-type': 'application/json' } }); }
            else { headers = req.clone(); }
        }

        // Response
        return next.handle(headers).pipe(
            catchError((error) => {
                return throwError(error);
            })
        );
    }


}
