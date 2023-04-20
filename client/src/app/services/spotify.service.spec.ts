// import { TestBed } from '@angular/core/testing';

// import { SpotifyService } from './spotify.service';

// describe('SpotifyService', () => {
//   let service: SpotifyService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(SpotifyService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { JoinScreenService } from './join-screen.service';
import { SpotifyService } from './spotify.service';
import { StartComponent } from '../pages/start/start.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let joinScreenService: jasmine.SpyObj<JoinScreenService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('JoinScreenService', ['getAuthUrl']);

    TestBed.configureTestingModule({
      declarations: [StartComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        StartComponent,
        SpotifyService,
        { provide: JoinScreenService, useValue: spy }
      ]
    });

    service = TestBed.inject(SpotifyService);
    joinScreenService = TestBed.inject(JoinScreenService) as jasmine.SpyObj<JoinScreenService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call loadScript when initializePlayer is called', () => {
    spyOn(service, 'loadScript');

    service.initializePlayer();

    expect(service.loadScript).toHaveBeenCalled();
  });


  it('should log an error message when initialization_error event is emitted', () => {
    spyOn(console, 'log');

    const message = { message: 'error message' };

    service.initialization_error(message);

    expect(console.log).toHaveBeenCalledWith('initialization_error Listener');
    expect(console.log).toHaveBeenCalledWith(message);
  });

  it('should log an error message when authentication_error event is emitted', () => {
    spyOn(console, 'log');

    const message = { message: 'error message' };

    service.authentication_error(message);

    expect(console.log).toHaveBeenCalledWith('authentication_error Listener');
    expect(console.log).toHaveBeenCalledWith(message);
  });

  it('should log an error message when account_error event is emitted', () => {
    spyOn(console, 'log');

    const message = { message: 'error message' };

    service.account_error(message);

    expect(console.log).toHaveBeenCalledWith('account_error Listener');
    expect(console.log).toHaveBeenCalledWith(message);
  });
}
)
