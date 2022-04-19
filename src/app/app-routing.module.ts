import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardClientComponent } from './components/dashboard-client/dashboard-client.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { RoleClientGuard } from './services/role-client.guard';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  {path:'',component:DashboardAdminComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard-client',component:DashboardClientComponent, canActivate:[AuthGuard,RoleClientGuard]},
  {path:'dashboard-admin',component:DashboardAdminComponent, canActivate:[AuthGuard,RoleGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
