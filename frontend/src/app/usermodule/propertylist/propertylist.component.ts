import { Component } from '@angular/core';
import { CallToActionComponent } from "../components/call-to-action/call-to-action.component";

@Component({
  selector: 'app-propertylist',
  standalone: true,
  imports: [CallToActionComponent],
  templateUrl: './propertylist.component.html',
  styleUrl: './propertylist.component.css'
})
export class PropertylistComponent {

}
