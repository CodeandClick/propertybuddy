import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PremiumComponent } from "../premium/premium.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usermaster',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    PremiumComponent,
    CommonModule
],
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css'],
 
})
export class UsermasterComponent {

  private stylesheets: string[] = [
    'css/font-icons.css',
    'css/plugins.css',
    'css/responsive.css',
    'css/style.css'
  ];

  private scripts: string[] = [
    'js/plugins.js',
    'js/main.js'
  ];
  private addedScripts: HTMLScriptElement[] = [];
  private addedStyles: HTMLLinkElement[] = [];

 
  constructor() {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      // this.addStyles(this.stylesheets);
      this.loadScriptsSequentially(this.scripts);
    }
  }

  ngOnDestroy(): void {
    // this.removeStyles();
    this.removeScripts();
  }

  private addStyles(styles: string[]): void {
    styles.forEach(href => {
      const linkElement = this.addStyle(href);
      if (linkElement) {
        this.addedStyles.push(linkElement);
      }
    });
  }

  private addStyle(href: string): HTMLLinkElement | null {
    // Check if the stylesheet is already added
    if (document.querySelector(`link[href="${href}"]`)) {
      return null;
    }
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
    return linkElement;
  }

  private removeStyles(): void {
    this.addedStyles.forEach(link => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    });
    this.addedStyles = [];
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
      scriptElement.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.body.appendChild(scriptElement);
      this.addedScripts.push(scriptElement);
    });
  }

  private removeScripts(): void {
    this.addedScripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    this.addedScripts = [];
  }
  isOverlayVisible : boolean = false;   

  showOverlay(){
    this.isOverlayVisible=true;
    
  }

  hideOverlay(event: Event) {
    if (event.target === event.currentTarget) {
      this.isOverlayVisible = false;
    }
  }
}
