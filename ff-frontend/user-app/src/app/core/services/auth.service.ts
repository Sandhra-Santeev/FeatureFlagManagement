import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}
  login(data: any) {
  return this.http.post(
    `${this.apiUrl}/login`,
    data
  );
}
}
