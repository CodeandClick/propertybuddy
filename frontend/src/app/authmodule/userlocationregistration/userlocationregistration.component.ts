import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userlocationregistration',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './userlocationregistration.component.html',
  styleUrl: './userlocationregistration.component.css'
})
export class UserlocationregistrationComponent {
  userDetailsRegistrationForm !: FormGroup;

  constructor( private authService : AuthService) {
    this.userDetailsRegistrationForm = new FormGroup({
      state: new FormControl(''),
      district: new FormControl(''),
      location:new FormControl(''),
      phoneNo: new FormControl(''),   //[Validators.required, Validators.minLength(6)]
      email: new FormControl(''),
      pincode:new FormControl('')

    });
  }

  
  onSubmit(){
    alert('hi')
console.log('helo0',this.userDetailsRegistrationForm.value)
  }
}
