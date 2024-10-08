import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { OtpmodalComponent } from '../otpmodal/otpmodal.component';
import { LoaderComponent } from '../loader/loader.component';
import { Observable, Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { CallToActionComponent } from "../../usermodule/components/call-to-action/call-to-action.component";

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule, RouterLink, ForgotpasswordComponent, OtpmodalComponent, LoaderComponent, CallToActionComponent],
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css', './../../../../public/css/style.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MasterComponent implements OnInit, OnDestroy {
  isLoading: Observable<boolean> = this.loaderService.isLoading;

  private stylesheets: string[] = [
    'css/font-icons.css',
    'css/plugins.css',
    'css/style.css',
    'css/responsive.css',
  ];

  private scripts: string[] = [
    // 'js/jquery.min.js', // Ensure jQuery is loaded first
    'js/plugins.js',
    'js/main.js',
  ];

  private addedScripts: HTMLScriptElement[] = [];
  private addedStyles: HTMLLinkElement[] = [];

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    // if (typeof document !== 'undefined') {
    //   this.addStyles(this.stylesheets);
    //   this.loadScriptsSequentially(this.scripts);
    // }
  }

  ngOnDestroy(): void {
    // this.removeStyles();
    // this.removeScripts();
  }

  private addStyles(styles: string[]): void {
    styles.forEach((href) => {
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
    this.addedStyles.forEach((link) => {
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
      scriptElement.onerror = () =>
        reject(new Error(`Failed to load script ${src}`));
      document.body.appendChild(scriptElement);
      this.addedScripts.push(scriptElement);
    });
  }

  private removeScripts(): void {
    this.addedScripts.forEach((script) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    this.addedScripts = [];
  }
}
