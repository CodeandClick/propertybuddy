import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSecondaryComponent } from './header-secondary.component';

describe('HeaderSecondaryComponent', () => {
  let component: HeaderSecondaryComponent;
  let fixture: ComponentFixture<HeaderSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSecondaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
