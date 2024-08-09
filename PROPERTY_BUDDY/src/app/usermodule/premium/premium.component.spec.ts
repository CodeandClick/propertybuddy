import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumComponent } from './premium.component';

describe('PremiumComponent', () => {
  let component: PremiumComponent;
  let fixture: ComponentFixture<PremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});





// function check() {
//   var checkBox = document.getElementById("checbox");
//   var text1 = document.getElementsByClassName("text1");
//   var text2 = document.getElementsByClassName("text2");

//   for (var i = 0; i < text1.length; i++) {
//     if(checkBox){
//     if (checkBox.checked == true ) {
//       text1[i].style.display = "block";
//       text2[i].style.display = "none";
//     } else if (checkBox.checked == false) {
//       text1[i].style.display = "none";
//       text2[i].style.display = "block";
//     }
//   }
//   }
// }
// check();

const setup = () => {
  return {
      isNavOpen: false,

      billPlan: 'monthly',

      plans: [
      {
          name: 'Easy',
          discretion: 'All the basics for businesses that are just getting started.',
          price: {
          monthly: 29,
          annually: 29 * 12 - 199,
          },
          features: ['One project', 'Your dashboard'],
      },
      {
          name: 'Basic',
          discretion: 'Better for growing businesses that want more customers.',
          price: {
          monthly: 59,
          annually: 59 * 12 - 100,
          },
          features: ['Two projects', 'Your dashboard', 'Components included', 'Advanced charts'],
      },
      {
          name: 'Custom',
          discretion: 'Advanced features for pros who need more customization.',
          price: {
          monthly: 139,
          annually: 139 * 12 - 100,
          },
          features: ['Unlimited projects', 'Your dashboard', '+300 Components', 'Chat support'],
      },
      ],
  }
}
