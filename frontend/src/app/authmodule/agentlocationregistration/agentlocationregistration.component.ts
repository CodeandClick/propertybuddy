import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agentlocationregistration',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agentlocationregistration.component.html',
  styleUrl: './agentlocationregistration.component.css',
})
export class AgentlocationregistrationComponent {
  agentAddressRegistrationForm!: FormGroup;
  states!: string[];
  districts!: string[];

  constructor(
    private authService: AuthService,
    private locationService: LocationService
  ) {
    this.agentAddressRegistrationForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]{10}'),
      ]), //[Validators.required, Validators.minLength(6)]
      email: new FormControl(localStorage.getItem('email')),
      pinCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]{6}'),
      ]),
      companyName: new FormControl('', [Validators.required]),
    });

    this.states = this.locationService.getState();
  }

  getControl(controlName: string) {
    return this.agentAddressRegistrationForm.get(controlName);
  }

  onSubmit() {
    if (this.agentAddressRegistrationForm.invalid) {
      this.agentAddressRegistrationForm.markAllAsTouched();
    } else {
      this.authService.pushAgentAdrress(
        this.agentAddressRegistrationForm.value
      );
      console.log(
        'location component',
        this.agentAddressRegistrationForm.value
      );
    }
  }

  onStateChange() {
    const state = this.agentAddressRegistrationForm.get('state');
    this.districts = this.locationService.getDistrict(state?.value);
  }
}
