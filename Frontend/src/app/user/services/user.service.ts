import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from '../../interfaces/user.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }
  
  updateUser(id: number, body: FormData): Observable<NewUser> {
    return this.http.put<NewUser>(`${this.baseUrl}/users/${id}`, body).pipe(
      catchError(err => of(err))
    );
  }

}
