import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationMoreComponent } from './user-registration-more.component';

describe('UserRegistrationMoreComponent', () => {
  let component: UserRegistrationMoreComponent;
  let fixture: ComponentFixture<UserRegistrationMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegistrationMoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
