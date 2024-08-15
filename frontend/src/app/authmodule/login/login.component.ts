import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallToActionComponent } from "../../usermodule/call-to-action/call-to-action.component";
import { ForgotpasswordComponent } from "../forgotpassword/forgotpassword.component";
import { RoleSelectComponent } from "../components/role-select/role-select.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CallToActionComponent,
    ForgotpasswordComponent,
    RoleSelectComponent,
    ReactiveFormsModule,
    FormsModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isOverlayVisible : boolean = false;

  passwordFieldType: string = 'password';

  loginForm !: FormGroup;
  constructor( private authService : AuthService){
    this.loginForm= new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  

  
  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  
  showOverlay(){
    this.isOverlayVisible=true;
  }

  closeOverlay(event: boolean) {
      this.isOverlayVisible = event;
  }

  getControl( controlName : string){
    return this.loginForm.get(controlName);
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value);
    }
  }
}
