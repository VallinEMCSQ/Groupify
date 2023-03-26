import { Component, OnInit } from '@angular/core';
import { StartService } from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  authToken: any;

  constructor(private startService: StartService) {}

  ngOnInit(): void {
    // complete spotify authorization and receive access token
    this.startService.getToken().subscribe(
      response => {
        this.authToken = response.link
        console.log("Token received and stored: ", this.authToken)
      }
    )
  }

}
