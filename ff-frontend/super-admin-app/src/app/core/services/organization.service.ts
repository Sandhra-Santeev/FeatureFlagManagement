import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  addOrganization(data: any) {

    return this.http.post(
      `${this.apiUrl}/add-organization`,
      data
    );

  }
  getOrganizations() {

  return this.http.get<any[]>(

    `${this.apiUrl}/organizations`

  );

}

}