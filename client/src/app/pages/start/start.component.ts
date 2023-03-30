import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StartService } from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  code!: string;
  state!: string;
  authToken: any;
  sessionPIN: any;
  queryParams!: Params;

  constructor(private startService: StartService, private route: ActivatedRoute) {
    // parse the query parameters from the start url and store the code and state
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    })
    this.code = this.queryParams['code'];
    this.state = this.queryParams['state'];
  }

  ngOnInit(): void {
    // send code and state parameters to complete spotify authorization and receive access token
    this.startService.getToken(this.code, this.state).subscribe(
      response => {
        this.authToken = response['link']
        console.log("Token received and stored: ", this.authToken)
      }
    )
  }
  // store the unique session PIN that backend creates when the Host button is clicked
  createSession(): void {
    this.startService.createSession().subscribe(
      response => {
        this.sessionPIN = response.sessionCode
        console.log("Session created. PIN: ", this.sessionPIN)
      }
    )
  }
}
