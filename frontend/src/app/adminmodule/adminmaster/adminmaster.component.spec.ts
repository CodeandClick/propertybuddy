import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmasterComponent } from './adminmaster.component';

describe('AdminmasterComponent', () => {
  let component: AdminmasterComponent;
  let fixture: ComponentFixture<AdminmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminmasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
