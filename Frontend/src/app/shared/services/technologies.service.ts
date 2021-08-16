import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Techonology } from '../../interfaces/technology.interface';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {

  baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  getTechnologies(): Observable<Techonology[]> {
    return this.http.get<Techonology[]>(`${this.baseUrl}/technologies`).pipe(
      catchError(err => of(err))
    );
  }
}
