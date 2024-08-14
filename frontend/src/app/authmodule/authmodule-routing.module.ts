import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { AgentregistrationComponent } from './agentregistration/agentregistration.component';
import { UserlocationregistrationComponent } from './userlocationregistration/userlocationregistration.component';
import { AgentlocationregistrationComponent } from './agentlocationregistration/agentlocationregistration.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'master/login',
    pathMatch: 'full',
  },
  {
    path: 'master',
    component: MasterComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'userregistration',
        component: UserregistrationComponent,
      },
      {
        path: 'agentregistration',
        component: AgentregistrationComponent,
      },
      {
        path: 'userlocationregistration',
        component: UserlocationregistrationComponent,
      },
      {
        path: 'agentlocationregistration',
        component: AgentlocationregistrationComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthmoduleRoutingModule { }
