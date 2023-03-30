import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  // backend completes spotify authorization and sends access token
  getToken(code: string, state: string): Observable<any> {
    console.log("start.service: Getting token through http request")
    return this.http.get('http://localhost:8080/callback', {
      params: {
        code: code,
        state: state
      }
    })
  }
  // backend creates a new session PIN, stores it in the db, and returns the PIN
  createSession(): Observable<any> {
    return this.http.get('http://localhost:8080/create-session')
  }
}
