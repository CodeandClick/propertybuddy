import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthmoduleRoutingModule } from './authmodule-routing.module';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations:[],
  imports: [
    CommonModule,
    AuthmoduleRoutingModule,
    LoginComponent,
    MasterComponent,
    RouterModule
  ]
})
export class AuthmoduleModule { 

}

