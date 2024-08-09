import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallToActionComponent } from "../../usermodule/call-to-action/call-to-action.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CallToActionComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isOverlayVisible : boolean = false;

  constructor(){}   
  
  showOverlay(){
    this.isOverlayVisible=true;
  }

  hideOverlay(event: Event) {
    if (event.target === event.currentTarget) {
      this.isOverlayVisible = false;
    }
  }
}
