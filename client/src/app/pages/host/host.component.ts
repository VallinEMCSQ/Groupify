import { Component } from '@angular/core';
<<<<<<< Updated upstream
=======
import { StartService } from '../start/start.service';
import { SpotifyService } from 'src/app/services/spotify.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent {

<<<<<<< Updated upstream
=======
  constructor(private startService: StartService, private spotifyService: SpotifyService) {
    this.createSession();

    // only initialize the player on the host page
    // the join page will just add songs to that player using the device id in spotifyService
    this.spotifyService.initializePlayer();
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
>>>>>>> Stashed changes
}
