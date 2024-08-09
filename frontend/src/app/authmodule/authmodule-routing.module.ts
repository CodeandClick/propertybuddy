import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { AgentregistrationComponent } from './agentregistration/agentregistration.component';
import { UserRegistration1Component } from './user-registration-1/user-registration-1.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'master/login',
    pathMatch:'full'
  },
  {
    path:'master',
    component:MasterComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'userregistration',
        component:UserregistrationComponent
      },
      {
        path:'agentregistration',
        component:AgentregistrationComponent
      },
      {
        path:'userregistration1',
        component:UserRegistration1Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthmoduleRoutingModule { }
