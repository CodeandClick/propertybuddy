import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermasterComponent } from './usermaster.component';

describe('UsermasterComponent', () => {
  let component: UsermasterComponent;
  let fixture: ComponentFixture<UsermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});






//  MAIN JS START

