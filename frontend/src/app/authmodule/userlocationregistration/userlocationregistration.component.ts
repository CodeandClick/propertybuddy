import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userlocationregistration',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './userlocationregistration.component.html',
  styleUrl: './userlocationregistration.component.css'
})
export class UserlocationregistrationComponent {
  userAddressRegistrationForm !: FormGroup;

  constructor( private authService : AuthService) {

    this.userAddressRegistrationForm = new FormGroup({
      state: new FormControl(''),
      district: new FormControl(''),
      place:new FormControl(''),
      phoneNumber: new FormControl(''),   //[Validators.required, Validators.minLength(6)]
      email: new FormControl(localStorage.getItem('email')),
      pinCode:new FormControl('')

    });
  }

  
  onSubmit(){
    this.authService.pushUserAdrress(this.userAddressRegistrationForm.value);
    console.log('location component',this.userAddressRegistrationForm.value)
  }
}
