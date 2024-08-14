import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-userlocationregistration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './userlocationregistration.component.html',
  styleUrl: './userlocationregistration.component.css',
})
export class UserlocationregistrationComponent {
  userAddressRegistrationForm!: FormGroup;
  states!: string[];
  districts!: string[];

  constructor(
    private authService: AuthService,
    private locationService: LocationService
  ) {
    this.userAddressRegistrationForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]), //[Validators.required, Validators.minLength(6)]
      email: new FormControl(localStorage.getItem('email')),
      pinCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{6}'),
      ]),
    });

    this.states = this.locationService.getState();
  }

  getControl(controlName: string) {
    return this.userAddressRegistrationForm.get(controlName);
  }

  onSubmit() {
    if (this.userAddressRegistrationForm.invalid) {
      this.userAddressRegistrationForm.markAllAsTouched();
    } else {
      this.authService.pushUserAdrress(this.userAddressRegistrationForm.value);
      console.log('location component', this.userAddressRegistrationForm.value);
    }
  }

  onStateChange() {
    const state = this.userAddressRegistrationForm.get('state');
    this.districts = this.locationService.getDistrict(state?.value);
  }
}
