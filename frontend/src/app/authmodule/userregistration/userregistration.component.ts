import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserRegistration1Component } from "../user-registration-1/user-registration-1.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-userregistration',
  standalone: true,
  imports: [ReactiveFormsModule, UserRegistration1Component, CommonModule, RouterLink],
  templateUrl: './userregistration.component.html',
  styleUrl: './userregistration.component.css'
})
export class UserregistrationComponent {
  page: boolean = true;
  userRegistrationForm !: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.userRegistrationForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]), 
      confirmPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
      role:new FormControl('user')
    });
  }


  onSubmit() {
    this.authService.pushUser(this.userRegistrationForm.value)
  }
  getControl(controlName:string){
    return this.userRegistrationForm.get(controlName);
  }
}
