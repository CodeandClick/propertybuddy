import { Component, ElementRef, Input, output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserRegistration1Component } from "../user-registration-1/user-registration-1.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CallToActionComponent } from "../../usermodule/call-to-action/call-to-action.component";
import { OtpmodalComponent } from "../otpmodal/otpmodal.component";



@Component({
  selector: 'app-userregistration',
  standalone: true,
  imports: [ReactiveFormsModule, UserRegistration1Component, CommonModule, RouterLink, CallToActionComponent, OtpmodalComponent,FormsModule],
  templateUrl: './userregistration.component.html',
  styleUrl: './userregistration.component.css'
})
export class UserregistrationComponent {
  @ViewChild('ltnForgetPasswordModal') ltnForgetPasswordModal!: ElementRef;
  verificationStatus='inherit'
  showModal : boolean =false
  page: boolean = true;
  formCheck = false;
  disableEmail=false;
  checkColor = "error-message";
  emailStatus=false
  strongPasswordRegx: RegExp =
    /^(?=[^A-Z][A-Z])(?=[^a-z][a-z])(?=\D*\d).{8,}$/;
  emailDomain: RegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  emailForOtp!:string;

  userRegistrationForm !: FormGroup;



  constructor(private authService: AuthService, private router: Router) {
    this.userRegistrationForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('user')
    },
      {
        validators: this.passwordChecker()
      });
    this.userRegistrationForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordValidators(value);
    });
  }

  eightCharector() {
    if (this.checkColor == "eight") {
      return 'success'
    } else {
      return 'error-mesage'
    }
  }
  upperCase() {
    if (this.checkColor == "error-message") {
      return 'success'
    } else {
      return 'error-mesage'
    }
  }
  LowerCase() {
    if (this.checkColor == "error-message") {
      return 'success'
    } else {
      return 'error-mesage'
    }
  }
  specialCharector() {
    if (this.checkColor == "error-message") {
      return 'success'
    } else {
      return 'error-mesage'
    }
  }
  hasaNumber() {
    if (this.checkColor == "error-message") {
      return 'success'
    } else {
      return 'error-mesage'
    }
  }
  passwordRequired() {
    if (this.checkColor == "error-message") {
      return 'error-message'
    } else {
      return 'success'
    }
  }


  updatePasswordValidators(password: string) {
    const passwordControl = this.userRegistrationForm.get('password');
    if (passwordControl) {
      const validators = [Validators.required, Validators.minLength(8)];
      if (password.length >= 8) {
        this.checkColor = "eight";
        validators.push(this.hasNumber, this.hasUpperCase, this.hasLowerCase, this.hasSpecialCharacter);
      } else {
        this.checkColor = "error-message"
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


  passwordFieldType: string = 'password';
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  changeFormCheck() {
    this.formCheck = true;
  } 
  emailClicked(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if(inputValue == ''){
      this.emailStatus=false;
    }else{
      this.emailStatus=true;
    }
    
  }
  onSubmit() {
    this.authService.pushUser(this.userRegistrationForm.value)

  }
  getControl(controlName: string) {
    return this.userRegistrationForm.get(controlName);
  }





  sendOtp(){
    this.authService.sendOtp(this.emailForOtp).subscribe( (res : any) =>{
      console.log('response:',res)
     if(res?.error){
      alert("Error")
      console.log("error",res.error)
     }else{
      this.showModal=true;
      alert("success")
      
     }
    })
  }


  verifyOtp($event : any){
    console.log('parent');
    this.authService.validateOtp( $event , this.emailForOtp).subscribe(res =>{
    if(res){
     this.disableEmail=true;
     this.verificationStatus='green'
     this.emailStatus=false
     this.showModal=false;
    }else{
      alert('Error');
      console.log('error',res);
      this.verificationStatus='red'
    }
    })
  }

  closeModal(event : boolean){
     this.showModal=event;
  }



}
