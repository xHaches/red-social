import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.getItem('token')}`
    })
    const reqClone = req.clone({headers});
    return next.handle(reqClone).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

}
