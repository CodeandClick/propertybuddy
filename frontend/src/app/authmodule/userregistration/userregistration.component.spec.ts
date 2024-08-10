import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserregistrationComponent } from './userregistration.component';

describe('UserregistrationComponent', () => {
  let component: UserregistrationComponent;
  let fixture: ComponentFixture<UserregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
