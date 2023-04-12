import { Component, OnInit } from '@angular/core';
import { expandUp, expandWidth, fadeIn } from 'src/app/animations';
import { StartService } from './start.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  animations: [
    fadeIn,
    expandUp,
    expandWidth
  ]
})
export class StartComponent implements OnInit{
  code!: string;
  state!: string;
  authToken: any;

  constructor(private startService: StartService) {}

  ngOnInit(): void {
    // send code and state parameters to complete spotify authorization and receive access token
    this.startService.getToken(this.code, this.state).subscribe(
      response => {
        this.authToken = response.link
        console.log("Token received and stored: ", this.authToken)
      }
    )
  }

}