import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentlocationregistrationComponent } from './agentlocationregistration.component';

describe('AgentlocationregistrationComponent', () => {
  let component: AgentlocationregistrationComponent;
  let fixture: ComponentFixture<AgentlocationregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentlocationregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentlocationregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
