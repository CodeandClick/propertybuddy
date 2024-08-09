import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { AgentregistrationComponent } from './agentregistration/agentregistration.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthmoduleRoutingModule { }
