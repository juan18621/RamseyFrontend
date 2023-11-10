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
import { AlertController } from '../components/alert/services/alert-controller.service';

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
    private alertController: AlertController
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
    req.url.includes('/api/files/') && this.alertController.startLoadingAux();
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
        req.url.includes('/api/files/') &&
          this.alertController.stopLoadingAux();
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
        title: error.error.msg,
        msg: this.buildErrorMessage(error),
      });
      return EMPTY;
    }
  }

  /**
   * build error message
   */
  buildErrorMessage(error: any): string {
    const defaultMessage = 'Something went wrong, please try again';
    if (error.error) {
      if (error.error.error) {
        return error.error.error;
      }
      if (error.error.info) {
        return error.error.info;
      }
      if (error.error) {
        return error.error;
      }
      return defaultMessage;
    } else {
      if (error.statusText) {
        return error.statusText;
      } else {
        return defaultMessage;
      }
    }
  }
  /**
   * get the token
   */
  get token() {
    return localStorage.getItem('token') || '';
  }
}
