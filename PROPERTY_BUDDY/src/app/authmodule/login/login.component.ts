import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  LoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  
  private userAuthService: UserAuthService = inject(UserAuthService);

  isOverlayVisible : boolean = false;

  constructor(){
    
  }   
  
  showOverlay(){
    this.isOverlayVisible=true;
  }

  hideOverlay(event: Event) {
    if (event.target === event.currentTarget) {
       this.isOverlayVisible = false;
    }
  }

  onSubmit() {
    console.log(this.LoginForm.value)
    this.userAuthService.handleLogin(this.LoginForm.value).subscribe(
      (res) => {
        console.log("this is from 200")
        console.log(res)
      },
      (err) => {
        console.log("this is from login failed")
        console.log(err)
      }
    );
  }
}
