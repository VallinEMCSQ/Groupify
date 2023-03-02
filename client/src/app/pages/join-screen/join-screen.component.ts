import { Component, OnInit } from '@angular/core';
import { JoinScreenService } from '../../services/join-screen.service';

export interface Login {
  link: string;
}

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.css']
})
export class JoinScreenComponent implements OnInit {
  loginUrl: any;

  constructor(private _joinScreenService: JoinScreenService) {}

  ngOnInit(): void {
    this._joinScreenService.getAuthUrl() // returns an Observable which can be handled using subscribe
      .subscribe(
        response => { // the response received from http request is a json with map of key "link" and value of type string
          this.loginUrl = response.link
          console.log("response received and stored: ")
          console.log(this.loginUrl)
        }
        );
  }

}
