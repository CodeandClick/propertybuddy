import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agentregistration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './agentregistration.component.html',
  styleUrl: './agentregistration.component.css'
})


export class AgentregistrationComponent {
  private userAuthService : UserAuthService = inject(UserAuthService)
  private router: Router = inject(Router);
  
  registerForm = new FormGroup({
   firstName : new FormControl(''),
   lastName : new FormControl(''),
   email : new FormControl(''),
   password: new FormControl(''),
   confirmPassword: new FormControl('')
  })

  errorMessage: string | null = null;


  onSubmit(){
    console.log(this.registerForm.value)
    this.userAuthService.handleRegister(this.registerForm.value).subscribe(
      (res)=>{
        console.log("this is 200")
        console.log(res)
        this.router.navigate(['/']); 
      },
      (err)=>{
        console.log("error",err)
        this.errorMessage = 'Registration failed. Please try again.';
      }
    )
  }
}
