import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private startService: StartService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.code = params['param1'];
      this.state = params['param2'];
    });
    console.log("Code: ", this.code);
    console.log("State: ", this.state);
  }

  ngOnInit(): void {
    // send a post to backend containing the code and state from the url query parameters
    this.startService.sendAuthParams(this.code, this.state).subscribe(
      (response: any) => {
        this.authToken = response.link
        console.log("Token received and stored: ", this.authToken)
      }
    )
    // complete spotify authorization and receive access token
    this.startService.getToken().subscribe(
      response => {
        this.authToken = response.link
        console.log("Token received and stored: ", this.authToken)
      }
    )
  }

}