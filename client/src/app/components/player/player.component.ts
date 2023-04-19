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
  current_track: any;
  queue: any;
  searchResults: any;

  constructor(private formBuilder: FormBuilder, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: '',
    });

    // Check if the player is ready before subscribing to player_state
    const checkPlayerInterval = setInterval(() => {
      if (this.spotifyService.isPlayerReady()) {
        clearInterval(checkPlayerInterval);
        this.spotifyService.player_state.subscribe((observer: any) => {
          // for some reason, subscribing to the observable returns a ZoneAwarePromise
          // so just resolve the promise to get the player state which contains current_track
          if (observer) {
            observer.then((state: any) => {
              this.current_track = state.track_window.current_track
              console.log("Current track: ", this.current_track.name)
            });
          }
          else {
            console.log("Null player state.")
          }
        });
      }
    }, 1000);

    // this.getQueue();
    // console.log("Queue:", this.queue)
  }


  onSearch() {
    const searchTerm = this.searchForm.controls['search'].value;
    console.log('Searching for', searchTerm);

    // Call the Spotify API to search for tracks with the given search term
    // and display the results in the template
    this.spotifyService.search(searchTerm).subscribe((tracks: any) => {
      this.searchResults = tracks.tracks.items;
      console.log("Tracks: ", tracks.tracks.items)
    })
  }

  onPlay() {
    // if (this.currentTrack) {
    //   this.spotifyService.togglePlay(this.currentTrack.uri);
    this.spotifyService.togglePlay();
    // }
  }


  onNext() {
    this.spotifyService.next();
  }

  onPrevious() {
    this.spotifyService.previous();
  }

  // getQueue() {
  //   const endpoint = "me/player/queue";
  //   this.spotifyService.getQuery(endpoint).subscribe((queue: any) => {
  //     this.queue = queue;
  //   });
  // }

  addToQueue() {

  }
}
