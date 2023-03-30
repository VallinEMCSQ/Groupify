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

  constructor(private formBuilder: FormBuilder, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: '',
    });

    this.spotifyService.initializePlayer();

    // this.spotifyService.getPlayerState().subscribe((state) => {
    //   if (state) {
    //     this.currentTrack = state.track_window.current_track;
    //   }
    // });
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
