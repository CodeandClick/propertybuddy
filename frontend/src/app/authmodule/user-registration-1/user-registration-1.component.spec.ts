import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistration1Component } from './user-registration-1.component';

describe('UserRegistration1Component', () => {
  let component: UserRegistration1Component;
  let fixture: ComponentFixture<UserRegistration1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegistration1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistration1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
