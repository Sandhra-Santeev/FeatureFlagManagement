import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from '../models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${this.apiUrl}/features`);
}

toggleFeature(id: string) {
  return this.http.post(
    `${this.apiUrl}/features/${id}/toggle`,
    {}
  );
}
addFeature(feature: Partial<Feature>) {
  return this.http.post(
    `${this.apiUrl}/add-feature`,
    feature
  );
}
getFeatureById(id: string) {

    return this.http.get<Feature>(
        `${this.apiUrl}/features/${id}`
    );

}
updateFeature(id:string,data:any){

    return this.http.put(

        `${this.apiUrl}/features/${id}/edit`,
        data

    );

}
 deleteFeature(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/features/${id}/delete`
    );
  }

}
