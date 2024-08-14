import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'auth',
        pathMatch:'full'
    },
    {
        path:'auth',
        loadChildren:()=> import("./authmodule/authmodule.module").then(m => m.AuthmoduleModule)
    },
    {
        path:'user',
        loadChildren:()=> import("./usermodule/usermodule.module").then(m => m.UsermoduleModule)
    }
];
