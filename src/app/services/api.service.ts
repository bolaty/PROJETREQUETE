import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private BASE_URL = 'http://51.210.111.16:1006';
  postData(url: string, data: any, fullUrl: boolean = false) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.post(fullUrl ? url : this.formatUrl(url), data, {
      headers,
    });
  }
  getData(url: string, data: any, fullUrl: boolean = false) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get(fullUrl ? url : this.formatUrl(url), { params: data });
  }

  formatUrl(url: string): string {
    return this.BASE_URL + url;
  }
}
