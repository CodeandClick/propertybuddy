import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-secondary',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-secondary.component.html',
  styleUrl: './header-secondary.component.css',
})
export class HeaderSecondaryComponent {
  isOverlayVisible: boolean = false;
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isSticky = true
  }
  
  showOverlay() {
    this.isOverlayVisible = true;
  }
}
