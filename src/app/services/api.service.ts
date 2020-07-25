import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'https://mufondev.muf.co.id/slctFromOrcl.php';
  constructor(private http: HttpClient) {}

  post(RequestBody): Observable<any> {
    return this.http.post<any>(this.apiUrl, RequestBody);
  }
}
