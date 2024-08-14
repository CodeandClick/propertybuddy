import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import $ from 'jquery';
import 'slick-carousel'; // Ensure Slick Carousel is imported

@Component({
  selector: 'app-imageslider-3',
  standalone: true,
  templateUrl: './imageslider-3.component.html',
  styleUrls: ['./imageslider-3.component.css'],
})
export class Imageslider3Component {
  private stylesheets: string[] = [
    'css/font-icons.css',
    'css/plugins.css',
    'css/style.css',
    'css/responsive.css',
  ];

  private scripts: string[] = ['js/plugins.js', 'js/main.js'];

  private addedScripts: HTMLScriptElement[] = [];
  private addedStyles: HTMLLinkElement[] = [];

  constructor() {
    if (typeof document !== 'undefined') {
      // this.addStyles(this.stylesheets);
      // this.loadScriptsSequentially(this.scripts);
    }
  }

  ngOnInit(): void {}

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
  // @ViewChild('slider', { static: true }) sliderElement?: ElementRef;

  // constructor(private el: ElementRef) {}

  // ngAfterViewInit(): void {
  //   if (this.el) {
  //     this.initializeSlider();
  //   } else {
  //     console.error('sliderElement is not defined');
  //   }
  // }

  // private initializeSlider(): void {
  //   if (this.el) {
  //     // Initialize Slick Carousel
  //     (this.el.nativeElement).slick({
  //       arrows: true,
  //       centerMode: true,
  //       centerPadding: '80px',
  //       dots: false,
  //       infinite: true,
  //       speed: 300,
  //       slidesToShow: 3,
  //       slidesToScroll: 1,
  //       prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
  //       nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
  //       responsive: [
  //         {
  //           breakpoint: 1600,
  //           settings: {
  //             slidesToShow: 2,
  //             slidesToScroll: 1
  //           }
  //         },
  //         {
  //           breakpoint: 1200,
  //           settings: {
  //             slidesToShow: 1,
  //             slidesToScroll: 1
  //           }
  //         },
  //         {
  //           breakpoint: 992,
  //           settings: {
  //             slidesToShow: 1,
  //             slidesToScroll: 1
  //           }
  //         },
  //         {
  //           breakpoint: 768,
  //           settings: {
  //             arrows: false,
  //             dots: true,
  //             centerMode: false,
  //             slidesToShow: 1,
  //             slidesToScroll: 1
  //           }
  //         },
  //         {
  //           breakpoint: 580,
  //           settings: {
  //             arrows: false,
  //             dots: true,
  //             centerMode: false,
  //             slidesToShow: 1,
  //             slidesToScroll: 1
  //           }
  //         }
  //       ]
  //     });
  //   }
  // }
}
