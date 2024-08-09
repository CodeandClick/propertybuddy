import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserRegistration1Component } from "../user-registration-1/user-registration-1.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CallToActionComponent } from "../../usermodule/call-to-action/call-to-action.component";

@Component({
  selector: 'app-userregistration',
  standalone: true,
  imports: [ReactiveFormsModule, UserRegistration1Component, CommonModule, RouterLink, CallToActionComponent],
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
    },
    {
      validators: this.passwordChecker()
    });
    this.userRegistrationForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordValidators(value);
    });
} 


updatePasswordValidators(password: string) {
const passwordControl = this.userRegistrationForm.get('password');
if (passwordControl) {
  const validators = [Validators.required, Validators.minLength(8)];
  if (password.length >= 8) {
    validators.push(this.hasNumber, this.hasUpperCase, this.hasLowerCase, this.hasSpecialCharacter);
  }
  passwordControl.setValidators(validators);
  passwordControl.updateValueAndValidity();
}
}
hasNumber(control: AbstractControl): ValidationErrors | null {
const pattern = /\d/;
return pattern.test(control.value) ? null : { hasNumber: true };
}
hasUpperCase(control: AbstractControl): ValidationErrors | null {
const pattern = /[A-Z]/;
return pattern.test(control.value) ? null : { hasUpperCase: true };
}

hasLowerCase(control: AbstractControl): ValidationErrors | null {
const pattern = /[a-z]/;
return pattern.test(control.value) ? null : { hasLowerCase: true };
}

hasSpecialCharacter(control: AbstractControl): ValidationErrors | null {
const pattern = /[!@#$%^&*(),.?":{}|<>]/;
return pattern.test(control.value) ? null : { hasSpecialCharacter: true };
}

passwordChecker(): ValidatorFn {
return (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password === confirmPassword) {
    if (password.length > 5) {
      return null;
    } else {
      return { passwordLengthError: true };
    }
  } else {
    return { passwordMissMatch: true };
  }
};
}


  onSubmit() {
    this.authService.pushUser(this.userRegistrationForm.value)

  }
  getControl(controlName:string){
    return this.userRegistrationForm.get(controlName);

  }
}
