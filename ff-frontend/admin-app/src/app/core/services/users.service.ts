import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:4000';
  
    constructor(private http: HttpClient) { }
    addUser(user: any):Observable<any> {
      return this.http.post(
        `${this.apiUrl}/add-user`,
        user
      );
    }
}
