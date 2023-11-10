import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CsAlertController } from 'src/app/lib/components/cs-alert/services/cs-alert-controller.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  /**
   *
   * @param router to manage the routing in the app
   * @param alertController service to manage alerts
   */
  constructor(
    private router: Router,
    private alertController: CsAlertController
  ) {}

  /**use this method in case you want to manange the alerts from the component not from here */
  manageRequestRealError() {
    localStorage.setItem('manageRequestRealError', 'true');
  }

  /**
   * Intercepts all the requests to add the token and handles the forbidden error
   * @param req request
   * @param next let pass the flow
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add the token
    let headers = new HttpHeaders();
    if (!req.url.includes('auth') && !req.url.includes('geocode')) {
      headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });
    } else {
      headers = req.headers;
    }

    this.alertController.startLoading();
    //clones the request
    const reqClone = req.clone({
      headers,
    });

    // send the clone of the request
    return next.handle(reqClone).pipe(
      //handles the errors
      catchError(this.handleError.bind(this)),
      map((resp) => {
        this.alertController.stopLoading();
        return resp;
      })
    );
  }

  /**
   * Method that handles the forbidden error
   * @param req request
   * @param next let pass the flow
   */
  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login');
    }

    if (localStorage.getItem('manageRequestRealError')) {
      //sets the flag to default status
      localStorage.removeItem('manageRequestRealError');
      return throwError(() => error);
    } else {
      this.alertController.handleError({
        title: 'Status: ' + error.error.responseCode,
        msg: error.error.responseMessage,
      });
      return EMPTY;
    }
  }
  /**
   * get the token
   */
  get token() {
    return localStorage.getItem('token') || '';
  }
}
