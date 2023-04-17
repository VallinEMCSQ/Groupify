import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { expandUp, expandWidth, fadeIn } from 'src/app/animations';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  animations: [
    fadeIn,
    expandUp,
    expandWidth
  ]
})
export class PlayerComponent implements OnInit {
  searchForm!: FormGroup;
  currentTrack: any;

  constructor(private formBuilder: FormBuilder, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: '',
    });

    this.spotifyService.initializePlayer();


    // Check if the player is ready before subscribing to player_state
    const checkPlayerInterval = setInterval(() => {
      if (this.spotifyService.isPlayerReady()) {
        clearInterval(checkPlayerInterval);
        this.spotifyService.player_state.subscribe((observer: any) => {
          // for some reason, subscribing to the observable returns a ZoneAwarePromise
          // so just resolve the promise to get the player state which contains current_track
          if (observer) {
            observer.then((state: any) => {
              this.currentTrack = state.track_window.current_track
              console.log("Current track: ", this.currentTrack.name)
            });
          }
          else {
            console.log("Null player state.")
          }
        });
      }
    }, 1000);
  }


  onSearch() {
    const searchTerm = this.searchForm.controls['search'].value;
    console.log('Searching for', searchTerm);

    // Call the Spotify API to search for tracks with the given search term
    // and display the results in the template
  }

  onPlay() {
    // if (this.currentTrack) {
    //   this.spotifyService.togglePlay(this.currentTrack.uri);
    this.spotifyService.togglePlay();
    // }
  }

  //   onPause() {
  //     this.spotifyService.pause();
  //   }

  onNext() {
    this.spotifyService.next();
  }

  onPrevious() {
    this.spotifyService.previous();
  }
}
