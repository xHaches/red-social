import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getFriendsfromUser(id: number) {
    return this.http.get(`${this.baseUrl}/friendships/by-user/${ id }`).pipe(
      catchError(err => of(err))
    );
  }
  
  getFriendFromUser(id_user: number, id_friend: number) {
    return this.http.get(`${this.baseUrl}/friendships/by-user/one/${ id_user }/${ id_friend }`).pipe(
      catchError(err => of(err))
    );
  }
  
  getFriendRequestFromUser(id: number) {
    return this.http.get(`${this.baseUrl}/friendships/by-user/requests/${ id }`).pipe(
      catchError(err => of(err))
    );
  }

  newFriend(id_user: number, id_friend: number) {
    return this.http.post(`${this.baseUrl}/friendships/${ id_user }/${ id_friend }`, {}).pipe(
      catchError(err => of(err))
    );
  }

  deleteFriend(id: number) {
    return this.http.delete(`${this.baseUrl}/friendships/by-user/one/${ id }`).pipe(
      catchError(err => of(err))
    );
  }

}
