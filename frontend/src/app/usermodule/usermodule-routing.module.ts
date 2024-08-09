import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AboutComponent } from './about/about.component';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import { ContactComponent } from './contact/contact.component';
import { PropertylistComponent } from './propertylist/propertylist.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PremiumComponent } from './premium/premium.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'userhome',
    pathMatch:'full'
  },
  {
    path:'usermaster',
    component:UsermasterComponent,
    children:[
      {
        path:'addproperty',
        component:AddpropertyComponent
      },
      {
        path:'propertylist',
        component:PropertylistComponent
      },
      {
        path:'propertydetails',
        component:PropertydetailsComponent
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path:'myaccount',
        component:MyaccountComponent
      },
      {
        path:'premium',
        component:PremiumComponent
      }
    ]
  },
  {
    path:'userhome',
    component:UserhomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermoduleRoutingModule { }
