import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CallToActionComponent } from "../../usermodule/call-to-action/call-to-action.component";
import { OtpmodalComponent } from "../otpmodal/otpmodal.component";

@Component({
  selector: 'app-agentregistration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, CallToActionComponent, OtpmodalComponent],
  templateUrl: './agentregistration.component.html',
  styleUrl: './agentregistration.component.css'
})
export class AgentregistrationComponent {
passwordRequired(): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
eightCharector(): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
hasaNumber(): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
upperCase(): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
LowerCase(): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
specialCharector(): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}

  page: boolean = true;
  formCheck = false;
  checkColor = "error-message";
  emailStatus=false;
 

  agentRegistrationForm !: FormGroup;


  constructor(private authService: AuthService, private router: Router) {
    this.agentRegistrationForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('agent')
    },
      {
        validators: this.passwordChecker()
      });
    this.agentRegistrationForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordValidators(value);
    });
  }

  // eightCharector() {
  //   if (this.checkColor == "eight") {
  //     return 'success'
  //   } else {
  //     return 'error-mesage'
  //   }
  // }
  // upperCase() {
  //   if (this.checkColor == "error-message") {
  //     return 'success'
  //   } else {
  //     return 'error-mesage'
  //   }
  // }
  // LowerCase() {
  //   if (this.checkColor == "error-message") {
  //     return 'success'
  //   } else {
  //     return 'error-mesage'
  //   }
  // }
  // specialCharector() {
  //   if (this.checkColor == "error-message") {
  //     return 'success'
  //   } else {
  //     return 'error-mesage'
  //   }
  // }
  // hasaNumber() {
  //   if (this.checkColor == "error-message") {
  //     return 'success'
  //   } else {
  //     return 'error-mesage'
  //   }
  // }
  // passwordRequired() {
  //   if (this.checkColor == "error-message") {
  //     return 'error-message'
  //   } else {
  //     return 'success'
  //   }
  // }


  updatePasswordValidators(password: string) {
    const passwordControl = this.agentRegistrationForm.get('password');
    if (passwordControl) {
      const validators = [Validators.required, Validators.minLength(8)];
      validators.push(this.hasNumber, this.hasUpperCase, this.hasLowerCase, this.hasSpecialCharacter);
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
        if (password.length > 8) {
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
    this.authService.pushUser(this.agentRegistrationForm.value)

  }
  getControl(controlName: string) {
    return this.agentRegistrationForm.get(controlName);

  }
}
