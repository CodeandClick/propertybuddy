import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmasterComponent } from './adminmaster/adminmaster.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AgentlistComponent } from './agentlist/agentlist.component';
import { AgentcardComponent } from './agentcard/agentcard.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'adminmaster/adminhome',
    pathMatch:'full'
  },
  {
    path:'adminmaster',
    component:AdminmasterComponent,
    children:[
      {
        path:'adminhome',
        component:AdminhomeComponent
      },
      {
        path:'userlist',
        component:UserlistComponent
      },
      {
        path:'agentlist',
        component:AgentlistComponent
      },
      {
        path:'agentcard',
        component:AgentcardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminmoduleRoutingModule { }
