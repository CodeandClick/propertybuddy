import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imageslider3Component } from './imageslider-3.component';

describe('Imageslider3Component', () => {
  let component: Imageslider3Component;
  let fixture: ComponentFixture<Imageslider3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imageslider3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imageslider3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
