import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Agent } from '../interfaces/agent';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url="http://localhost:4000";
  constructor( private http : HttpClient, private router : Router) { }



  sendOtp(email : string){
    return this.http.post(this.url+'/user/verifyMail',{ email, role : 'user'});
  }




  

  validateOtp(otp : string , email : string){  
  return this.http.post(this.url+'/user/verifyOtp',{ otp , email })
  }




  // User Fn

  pushUser( user:User){
   this.http.post(this.url+'/user/register/',user).subscribe((res : any ) => {
      if(res){
        localStorage.setItem("accessToken",res.accessToken)
        localStorage.setItem("refreshToken",res.refreshToken)
        this.router.navigate(['auth/master/userlocationregistration'])
      }else{
        alert('error')
      }
    },
  (error)=>{
    console.log('404')
  })
  }

  pushUserAdrress(user : any){
    console.log('user',user)
    this.http.put(this.url+'/user/userAddressRegister/', user ).subscribe(res =>{
      if(res){
        alert("sucess")
      }
    },
    (error)=>{
      console.log('404',error)
    })
  }



  // Agent Fn
pushAgent(agent: Agent) {
  this.http.post(this.url + '/agent/register/', agent).subscribe(
    (res: any) => {
      if (res) {
        localStorage.setItem("access-token", res.accessToken);
        localStorage.setItem("refresh-token", res.refreshToken);
        this.router.navigate(['/master/userlocationregistration']);
      } else {
        alert('error');
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

}

