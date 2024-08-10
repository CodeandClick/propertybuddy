import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertylistComponent } from './propertylist.component';

describe('PropertylistComponent', () => {
  let component: PropertylistComponent;
  let fixture: ComponentFixture<PropertylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
