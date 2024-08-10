import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-registration-1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-registration-1.component.html',
  styleUrl: './user-registration-1.component.css'
})
export class UserRegistration1Component {
  userRegistrationForm !: FormGroup;

  constructor( private authService : AuthService) {
    this.userRegistrationForm = new FormGroup({
      fullName: new FormControl(''),
      lastName: new FormControl(''),
      email:new FormControl(''),
      password: new FormControl('')   //[Validators.required, Validators.minLength(6)]
    });
  }

  
  onSubmit(){
    alert('hi')
console.log('helo0',this.userRegistrationForm.value)
  }

}
