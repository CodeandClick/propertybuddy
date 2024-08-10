import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcardComponent } from './agentcard.component';

describe('AgentcardComponent', () => {
  let component: AgentcardComponent;
  let fixture: ComponentFixture<AgentcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
