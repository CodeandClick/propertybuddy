
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminmaster',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './adminmaster.component.html',
  styleUrls: ['./adminmaster.component.css','./../../../../public/assets/css/main.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class AdminmasterComponent implements OnInit, OnDestroy {
  private scripts: string[] = [
    'assets/js/main.js',
    'assets/js/vendors/jquery-3.6.0.min.js',
    'assets/js/vendors/bootstrap.bundle.min.js',
    'assets/js/vendors/select2.min.js',
    'assets/js/vendors/perfect-scrollbar.js',
    'assets/js/vendors/jquery.fullscreen.min.js',
    'assets/js/vendors/chart.js',
    'assets/js/custom-chart.js'
  ];

  private stylesheets: string[] = [
    'assets/css/main.css'
  ];

  private addedScripts: HTMLScriptElement[] = [];
  private addedStyles: HTMLLinkElement[] = [];

  constructor() {}

  ngOnInit() {
    if (typeof document !== 'undefined') {
      this.addStyles(this.stylesheets);
      this.addScripts(this.scripts);
    }
  }

  ngOnDestroy() {
    this.removeStyles();
    this.removeScripts();
  }

  private addStyles(styles: string[]) {
    styles.forEach(href => {
      const linkElement = this.addStyle(href);
      if (linkElement) {
        linkElement.onerror = () => console.error(`Failed to load stylesheet ${href}`);
        this.addedStyles.push(linkElement);
      }
    });
  }

  private addStyle(href: string): HTMLLinkElement | null {
    if (document.querySelector(`link[href="${href}"]`)) {
      return null;
    }

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
    return linkElement;
  }

  private removeStyles() {
    this.addedStyles.forEach(link => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    });
    this.addedStyles = [];
  }

  private addScripts(scripts: string[]) {
    this.loadScriptsSequentially(scripts).then(() => {
      console.log("All scripts loaded.");
      this.initializeScripts();
    }).catch(error => {
      console.error("Error loading scripts:", error);
    });
  }

  private loadScriptsSequentially(scripts: string[]): Promise<void> {
    return scripts.reduce((promise, src) => {
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
      scriptElement.async = true;
      scriptElement.onload = () => resolve();
      scriptElement.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.body.appendChild(scriptElement);
      this.addedScripts.push(scriptElement);
    });
  }

  private removeScripts() {
    this.addedScripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    this.addedScripts = [];
  }

  private initializeScripts() {
    console.log("Scripts initialized.");
  }
}
