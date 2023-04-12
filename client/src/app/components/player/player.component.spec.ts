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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PlayerComponent } from './player.component';
import { SpotifyService } from '../../services/spotify.service';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SpotifyService', ['initializePlayer', 'togglePlay', 'next', 'previous']);
    await TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ { provide: SpotifyService, useValue: spy } ]
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

  it('should initialize the searchForm on component init', () => {
    expect(component.searchForm).toBeDefined();
  });

  it('should call the Spotify service to initialize the player on component init', () => {
    expect(spotifyServiceSpy.initializePlayer).toHaveBeenCalled();
  });


});