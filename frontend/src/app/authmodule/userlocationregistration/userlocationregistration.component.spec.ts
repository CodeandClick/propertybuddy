import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlocationregistrationComponent } from './userlocationregistration.component';

describe('UserlocationregistrationComponent', () => {
  let component: UserlocationregistrationComponent;
  let fixture: ComponentFixture<UserlocationregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserlocationregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlocationregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
