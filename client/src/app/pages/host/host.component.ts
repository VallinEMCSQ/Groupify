import { Component } from '@angular/core';
import { StartService } from '../start/start.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent {
  sessionPIN: any;

  constructor(private startService: StartService) {
    this.createSession();
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
