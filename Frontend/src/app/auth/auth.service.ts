import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }


  login(form: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth`, form).pipe(
      catchError(err => of(err))
    );
  }

  register(form: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, form).pipe(
      catchError(err => of(err))
    );
  }

  validateToken() {
    return this.http.get<any>(`${this.baseUrl}/auth/refresh`);
  }
}
