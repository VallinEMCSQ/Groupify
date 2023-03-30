// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { StartComponent } from './start.component';

// describe('StartComponent', () => {
//   let component: StartComponent;
//   let fixture: ComponentFixture<StartComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ StartComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(StartComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { StartService } from './start.service';
import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let startServiceSpy: jasmine.SpyObj<StartService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StartService', ['getToken', 'createSession']);
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
      providers: [
        { provide: StartService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ code: 'my-code', state: 'my-state' })),
          },
        },
      ],
    }).compileComponents();
    startServiceSpy = TestBed.inject(StartService) as jasmine.SpyObj<StartService>;
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getToken method on startService with code and state on ngOnInit', () => {
    startServiceSpy.getToken.and.returnValue(of({ link: 'my-link' }));
    component.ngOnInit();
    expect(startServiceSpy.getToken).toHaveBeenCalledWith('my-code', 'my-state');
    expect(component.authToken).toEqual('my-link');
  });

  it('should call createSession method on startService on click of Host button', () => {
    startServiceSpy.createSession.and.returnValue(of({ sessionCode: 'my-session-code' }));
    const hostButton = fixture.debugElement.nativeElement.querySelector('.host-button');
    hostButton.click();
    expect(startServiceSpy.createSession).toHaveBeenCalled();
    expect(component.sessionPIN).toEqual('my-session-code');
  });
});
