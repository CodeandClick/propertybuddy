import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpmodalComponent } from './otpmodal.component';

describe('OtpmodalComponent', () => {
  let component: OtpmodalComponent;
  let fixture: ComponentFixture<OtpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
