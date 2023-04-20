// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { SpotifyService } from 'src/app/services/spotify.service';
// import { JoinScreenService } from 'src/app/services/join-screen.service';

// import { PlayerComponent } from './player.component';
// import { ReactiveFormsModule } from '@angular/forms';

// describe('PlayerComponent', () => {
//   let component: PlayerComponent;
//   let fixture: ComponentFixture<PlayerComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule, ReactiveFormsModule ],
//       declarations: [ PlayerComponent ],
//       providers: [
//         SpotifyService,
//         JoinScreenService
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PlayerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { of } from 'rxjs';
// import { PlayerComponent } from './player.component';
// import { SpotifyService } from '../../services/spotify.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('PlayerComponent', () => {
//   let component: PlayerComponent;
//   let fixture: ComponentFixture<PlayerComponent>;
//   let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;

//   beforeEach(async () => {
//     const spy = jasmine.createSpyObj('SpotifyService', ['initializePlayer', 'togglePlay', 'next', 'previous']);
//     await TestBed.configureTestingModule({
//       declarations: [ PlayerComponent ],
//       imports: [ ReactiveFormsModule, BrowserAnimationsModule ],
//       providers: [ { provide: SpotifyService, useValue: spy } ]
//     })
//     .compileComponents();

//     spotifyServiceSpy = TestBed.inject(SpotifyService) as jasmine.SpyObj<SpotifyService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PlayerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the searchForm on component init', () => {
//     expect(component.searchForm).toBeDefined();
//   });

//   it('should call the Spotify service to initialize the player on component init', () => {
//     expect(spotifyServiceSpy.initializePlayer).toHaveBeenCalled();
//   });


// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerComponent } from './player.component';
import { SpotifyService } from '../../services/spotify.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SpotifyService', ['initializePlayer', 'togglePlay', 'next', 'previous']);
    await TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      imports: [ ReactiveFormsModule, BrowserAnimationsModule ],
      providers: [ { provide: SpotifyService, useValue: spy } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    spotifyServiceSpy = TestBed.inject(SpotifyService) as jasmine.SpyObj<SpotifyService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a search form', () => {
    expect(component.searchForm).toBeTruthy();
  });

  it('should call spotifyService.search() on form submit', () => {
    const searchButton = fixture.nativeElement.querySelector('button[type=submit]');
    searchButton.click();
    expect(spotifyServiceSpy.search).toHaveBeenCalled();
  });

  // it('should call spotifyService.addToQueue() on button click', () => {
  //   const addButton = fixture.nativeElement.querySelector('button');
  //   addButton.click();
  //   expect(spotifyServiceSpy.addToQueue).toHaveBeenCalled();
  // });

  it('should call spotifyService.togglePlay() on play button click', () => {
    const playButton = fixture.nativeElement.querySelectorAll('button')[0];
    playButton.click();
    expect(spotifyServiceSpy.togglePlay).toHaveBeenCalled();
  });

  it('should call spotifyService.next() on next button click', () => {
    const nextButton = fixture.nativeElement.querySelectorAll('button')[1];
    nextButton.click();
    expect(spotifyServiceSpy.next).toHaveBeenCalled();
  });

  it('should call spotifyService.previous() on previous button click', () => {
    // spyOn(component.spotifyService, 'previous');
    const previousButton = fixture.nativeElement.querySelectorAll('button')[2];
    previousButton.click();
    expect(component.spotifyService.previous).toHaveBeenCalled();

    expect(spotifyServiceSpy.previous()).toHaveBeenCalled();
  });
});
