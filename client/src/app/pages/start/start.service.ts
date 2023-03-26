import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient) { }

  // backend completes spotify authorization and sends access token
  getToken(): Observable<any> {
    console.log("start.service: Getting token through http request")
    return this.http.get('http://localhost:8080/token')
  }
}
