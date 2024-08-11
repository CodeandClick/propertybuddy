import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url="http://localhost:4000";
  constructor( private http : HttpClient) { }



  sendOtp(email : string){
    return this.http.post(this.url+'/user/verifyMail',{ email, role : 'user'});
  }
  validateOtp(otp : string , email : string){  
  return this.http.post(this.url+'/user/verifyOtp',{ otp , email })
 }z

  pushUser( user:User){
    console.log(user)
    this.http.post(this.url+'/user/register/',user).subscribe(res =>{
      if(res){
        alert('sucess')
      }else{
        alert('failed')
      }
    })
  }
}
