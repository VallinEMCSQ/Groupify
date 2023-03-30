import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { StartComponent } from 'src/app/pages/start/start.component';
import { StartService } from 'src/app/pages/start/start.service';



describe('StartComponent', () => {
  let component: StartComponent
  let fixture: ComponentFixture<StartComponent>;
  let startService: StartService
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ StartComponent ],
      imports: [ RouterTestingModule ],
      providers: [ StartService ],
    });

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    startService = TestBed.inject(StartService);
    route = TestBed.inject(ActivatedRoute);

    // Set up route query parameters
    const fakeQueryParams: Params = {
      code: 'test-code',
      state: 'test-state'
    };
    route.queryParams.next(fakeQueryParams);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startService.getToken on init', () => {
    const spy = spyOn(startService, 'getToken').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('test-code', 'test-state');
  });

  it('should set authToken when startService.getToken succeeds', () => {
    const fakeResponse = { link: 'fake-token' };
    spyOn(startService, 'getToken').and.returnValue(of(fakeResponse));
    fixture.detectChanges();
    expect(component.authToken).toEqual(fakeResponse.link);
  });

  it('should call startService.createSession on createSession', () => {
    const spy = spyOn(startService, 'createSession').and.callThrough();
    component.createSession();
    expect(spy).toHaveBeenCalled();
  });

  it('should set sessionPIN when startService.createSession succeeds', () => {
    const fakeResponse = { sessionCode: 'fake-pin' };
    spyOn(startService, 'createSession').and.returnValue(of(fakeResponse));
    component.createSession();
    expect(component.sessionPIN).toEqual(fakeResponse.sessionCode);
  });
});
