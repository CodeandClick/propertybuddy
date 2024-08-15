import { Component } from '@angular/core';
import { CallToActionComponent } from '../components/call-to-action/call-to-action.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproperty',
  standalone: true,
  imports: [CallToActionComponent, BreadcrumbComponent, CommonModule],
  templateUrl: './addproperty.component.html',
  styleUrl: './addproperty.component.css',
})
export class AddpropertyComponent {
  navigations = [
    {
      id: 1,
      nav: 'Description',
    },
    {
      id: 2,
      nav: 'Media',
    },
    {
      id: 3,
      nav: 'Location',
    },
    {
      id: 4,
      nav: 'Details',
    },
    {
      id: 5,
      nav: 'Amenities',
    },
  ];
  currentNav: number = 1;

  propertyTypes = [
    {
      title: 'Apartment',
      icon: 'flaticon-apartment',
    },
    {
      title: 'Independent Floor',
      icon: 'flaticon-car',
    },
    {
      title: 'Independent House',
      icon: 'fas fa-eye',
    },
    {
      title: 'Villa',
      icon: 'laticon-villa',
    },
  ];

  setCurrentNav(id: number) {
    this.currentNav = id;
  }

  nextNav() {
    this.currentNav++;
  }

  prevNav() {
    this.currentNav--;
  }
}
