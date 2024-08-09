import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './premium.component.html',
  styleUrl: './premium.component.css'
})
export class PremiumComponent {
 activeTab1 : string ='buy'
 activeTab2 : string ='yearly'



 
 
 t=false;
 setActiveTab1(tab: string) {
  this.activeTab1 = tab;
}
setActiveTab2(tab: string) {
  this.activeTab2 = tab;
}
test(){
  this.t=true;
  alert('ki')
}
}
