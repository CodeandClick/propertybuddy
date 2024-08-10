import { Component } from '@angular/core';
import { CallToActionComponent } from "../call-to-action/call-to-action.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CallToActionComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

}
