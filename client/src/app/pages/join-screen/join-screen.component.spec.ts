// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { JoinScreenComponent } from './join-screen.component';

// describe('JoinScreenComponent', () => {
//   let component: JoinScreenComponent;
//   let fixture: ComponentFixture<JoinScreenComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ JoinScreenComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(JoinScreenComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { JoinScreenComponent, Login } from './join-screen.component';
import { JoinScreenService } from '../../services/join-screen.service';

describe('JoinScreenComponent', () => {
  let component: JoinScreenComponent;
  let fixture: ComponentFixture<JoinScreenComponent>;
  let joinScreenService: JoinScreenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinScreenComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ JoinScreenService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinScreenComponent);
    component = fixture.componentInstance;
    joinScreenService = TestBed.inject(JoinScreenService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the loginUrl property with the response from getAuthUrl', () => {
    const mockResponse: Login = { link: 'mock-url' };
    spyOn(joinScreenService, 'getAuthUrl').and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(component.loginUrl).toEqual('mock-url');
  });
});