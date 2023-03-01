import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Login {
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class JoinScreenService {

  constructor(private http: HttpClient) { }

  // TODO: Figure out the correct type to set Observable instead of any
  getAuthUrl(): Observable<any> {
    console.log("join-screen.service: Getting auth url through http request");
    return this.http.get('http://localhost:8080/link');
  }
}
