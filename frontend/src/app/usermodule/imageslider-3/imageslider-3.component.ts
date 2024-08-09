import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import $ from 'jquery';
import 'slick-carousel'; // Ensure Slick Carousel is imported

@Component({
  selector: 'app-imageslider-3',
  standalone: true,
  templateUrl: './imageslider-3.component.html',
  styleUrls: ['./imageslider-3.component.css']
})
export class Imageslider3Component implements AfterViewInit {

  @ViewChild('slider', { static: true }) sliderElement?: ElementRef;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.el) {
      this.initializeSlider();
    } else {
      console.error('sliderElement is not defined');
    }
  }

  private initializeSlider(): void {
    if (this.el) {
      // Initialize Slick Carousel
      (this.el.nativeElement).slick({
        arrows: true,
        centerMode: true,
        centerPadding: '80px',
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
        nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              centerMode: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 580,
            settings: {
              arrows: false,
              dots: true,
              centerMode: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  }
}
