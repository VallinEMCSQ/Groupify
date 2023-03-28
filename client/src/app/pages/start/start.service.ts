import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  sendAuthParams(code: string, state: string) {
    return this.http.post('http://localhost:8080/callback', code)
  }

  // backend completes spotify authorization and sends access token
  getToken(): Observable<any> {
    console.log("start.service: Getting token through http request")
    return this.http.get('http://localhost:8080/token', {
      params: {
        code: 'code',
        state: 'state'
      }
    })
  }
}
