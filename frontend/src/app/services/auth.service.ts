import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url="http://localhost:3000";
  constructor( private http : HttpClient) { }

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
