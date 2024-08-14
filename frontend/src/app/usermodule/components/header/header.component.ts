import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private scripts: string[] = ['js/plugins.js', 'js/main.js'];
  private addedScripts: HTMLScriptElement[] = [];
  isOverlayVisible: boolean = false;
  mobileMenu: boolean = false;

  constructor(private eRef: ElementRef) {
    // if (typeof document !== 'undefined') {
    //   this.addStyles(this.stylesheets);
    //   this.loadScriptsSequentially(this.scripts);
    // }
  }

  private loadScriptsSequentially(scripts: string[]): void {
    scripts.reduce((promise, src) => {
      return promise.then(() => this.loadScript(src));
    }, Promise.resolve());
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const scriptElement = document.createElement('script');
      scriptElement.src = src;
      scriptElement.onload = () => resolve();
      scriptElement.onerror = () =>
        reject(new Error(`Failed to load script ${src}`));
      document.body.appendChild(scriptElement);
      this.addedScripts.push(scriptElement);
    });
  }

  showOverlay() {
    this.isOverlayVisible = true;
  }

  hideOverlay(event: Event) {
    if (event.target === event.currentTarget) {
      this.isOverlayVisible = false;
    }
  }

  showMobileMenu() {
    this.mobileMenu = true;
    document.addEventListener('click', this.onClickOutside.bind(this));
  }

  hideMobileMenu() {
    this.mobileMenu = false;
    document.removeEventListener('click', this.onClickOutside.bind(this));
  }

  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileMenu();
    }
  }
}
