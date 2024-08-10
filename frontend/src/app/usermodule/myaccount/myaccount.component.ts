import { Component } from '@angular/core';
import { CallToActionComponent } from "../call-to-action/call-to-action.component";

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [CallToActionComponent],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent {

}
