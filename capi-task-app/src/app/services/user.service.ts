import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  updateUser(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data);
  }

  getUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
