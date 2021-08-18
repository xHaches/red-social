import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  sendQualification(id_user: number, id_technology: number, body: any) {
    return this.http.post(`${this.baseUrl}/qualifications/${id_user}/${id_technology}`, body);
  }

  getQualificationsByUser(id_user: number) {
    return this.http.get(`${this.baseUrl}/qualifications/user/${id_user}`);
  }

  getMeanQualificationsByUser(id_user: number) {
    return this.http.get(`${this.baseUrl}/qualifications/mean/${id_user}`);
  }
}
