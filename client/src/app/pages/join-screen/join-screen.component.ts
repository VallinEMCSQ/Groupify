import { Component, OnInit } from '@angular/core';
import { JoinScreenService } from './join-screen.service';

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.css']
})
export class JoinScreenComponent implements OnInit {
  loginUrl = "";

  constructor(private _joinScreenService: JoinScreenService) {}

  ngOnInit(): void {
    this._joinScreenService.getAuthUrl()
      .subscribe(data => this.loginUrl = data);
  }

  getAuthUrl() {
    this._joinScreenService.getAuthUrl()
      .subscribe(data => this.loginUrl = data);
  }
}
