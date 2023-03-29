import { Component, OnInit } from '@angular/core';
import { fadeIn, expandUp, expandWidth } from 'src/app/animations';
import { JoinScreenService } from '../../services/join-screen.service';


export interface Login {
  link: string;
}

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.css'],
  animations: [
    fadeIn,
    expandUp,
    expandWidth
  ]
})
export class JoinScreenComponent implements OnInit {
  loginUrl: any;

  constructor(private joinScreenService: JoinScreenService) {}

  ngOnInit(): void {
    this.joinScreenService.getAuthUrl() // returns an Observable which can be handled using subscribe
      .subscribe(
        response => { // the response received from http request is a json with map of key "link" and value of type string
          this.loginUrl = response.link
          console.log("Response received and stored: ", this.loginUrl)
        }
        );

  }

}
