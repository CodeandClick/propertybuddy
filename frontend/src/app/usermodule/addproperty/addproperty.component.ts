import { Component } from '@angular/core';
import { CallToActionComponent } from "../call-to-action/call-to-action.component";

@Component({
  selector: 'app-addproperty',
  standalone: true,
  imports: [CallToActionComponent],
  templateUrl: './addproperty.component.html',
  styleUrl: './addproperty.component.css'
})
export class AddpropertyComponent {

}
