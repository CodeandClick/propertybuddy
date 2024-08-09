import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class UserAuthService {

  private api: string = 'http://localhost:3000'

  private http: HttpClient = inject(HttpClient);

  constructor() { 
    
  }

handleLogin(data: any) {
    const url: string = `${this.api}/user/login`
    return this.http.get(url);
  }


  
handleRegister(data:any){
    const url :string = `${this.api}/user/register`
    return this.http.post(url,data)
  }
}















