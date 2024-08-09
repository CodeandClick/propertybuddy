import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmasterComponent } from './adminmaster/adminmaster.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminmoduleRoutingModule { }
