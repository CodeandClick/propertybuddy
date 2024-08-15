import {
  Component,
  ElementRef,
  Input,
  NO_ERRORS_SCHEMA,
  output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CallToActionComponent } from '../../usermodule/call-to-action/call-to-action.component';
import { OtpmodalComponent } from '../otpmodal/otpmodal.component';

@Component({
  selector: 'app-agentregistration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    CallToActionComponent,
    OtpmodalComponent,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './agentregistration.component.html',
  styleUrl: './agentregistration.component.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class AgentregistrationComponent {
  inValidOtp: boolean = false;
  emailStatusColor = 'inherit';
  showModal: boolean = false;
  verificationStatus: boolean = false;
  formCheck: boolean = false;
  disableEmail: boolean = false;
  emailStatus = false;
  emailForOtp!: string;
  emailExist: boolean = false;

  agentRegistrationForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.agentRegistrationForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        role: new FormControl('agent'),
      },
      {
        validators: this.passwordChecker(),
      }
    );
    this.agentRegistrationForm
      .get('password')
      ?.valueChanges.subscribe((value) => {
        this.updatePasswordValidators(value);
      });
  }

  updatePasswordValidators(password: string) {
    const passwordControl = this.agentRegistrationForm.get('password');
    if (passwordControl) {
      const validators = [Validators.required, Validators.minLength(8)];
      if (password.length >= 8) {
        validators.push(
          this.hasNumber,
          this.hasUpperCase,
          this.hasLowerCase,
          this.hasSpecialCharacter
        );
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
        return null;
      } else {
        return { passwordMissMatch: true };
      }
    };
  }

  passwordFieldType: string = 'password';
  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  changeFormCheck() {
    this.formCheck = true;
  }

  emailClicked(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue == '') {
      this.emailStatus = false;
    } else {
      this.emailStatus = true;
    }
  }

  onSubmit() {
    if (this.agentRegistrationForm.invalid || this.verificationStatus) {
      this.agentRegistrationForm.markAllAsTouched();
    } else {
      this.authService.pushAgent(this.agentRegistrationForm.value);
    }
  }

  getControl(controlName: string) {
    return this.agentRegistrationForm.get(controlName);
  }

  sendOtp() {
    localStorage.setItem('email', this.getControl('email')?.value);
    this.emailStatus = false;
    this.authService.sendOtp(this.getControl('email')?.value).subscribe(
      (res) => {
        console.log(res);
        
        this.verificationStatus = false;
        this.emailExist = false;
        this.showModal = true;
      },
      (error) => {
        console.log(error);
        
        this.emailStatus = true;
        this.emailExist = true;
      }
    );
  }

  verifyOtp($event: any) {
    this.authService
      .validateOtp($event, this.getControl('email')?.value)
      .subscribe(
        (res: any) => {
          if (res) {
            // this.disableEmail = true;
            this.verificationStatus = true;
            this.emailStatusColor = 'green';
            this.emailStatus = false;
            this.showModal = false;
            alert('email verified');
          } else {
            console.log('error', res.error.message);
            this.emailStatusColor = 'red';
            this.showModal = false;
            this.inValidOtp = true;
          }
        },
        (error) => {
          this.inValidOtp = true;
        }
      );
  }

  closeModal(event: boolean) {
    this.showModal = event;
    this.emailStatus = true;
  }
}
