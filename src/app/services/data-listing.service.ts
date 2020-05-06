import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataListingService {
  private apiEndpoint = 'api/heroes';  // URL to web api // TODO endpoints in environment.ts

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    // return this.http.get<any>(this.apiEndpoint);
    return of(require("./mock/MOCK_COUNTRY_LIST.json"));
  }
}
