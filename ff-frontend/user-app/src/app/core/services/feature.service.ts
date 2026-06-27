import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  evaluateFeature(
    key: string,
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/feature-flags/evaluate/${key}`,
    );

  }

}