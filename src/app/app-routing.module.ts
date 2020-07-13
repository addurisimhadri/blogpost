import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { ParentComponent } from './parent/parent.component';
import { PostComponent } from './post/post.component';
import { UserimageuploadComponent } from './userimageupload/userimageupload.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'home', component: HomeComponent,canActivate:[AuthGuardService]},
  { path:'viewemployee', component: EmployeeComponent,canActivate:[AuthGuardService]},
  { path:'login', component: LoginComponent }, 
  { path:'addemployee', component: AddEmployeeComponent,canActivate:[AuthGuardService]},
  { path:'editemployee', component: EditemployeeComponent,canActivate:[AuthGuardService]},
  { path:'parent', component: ParentComponent,canActivate:[AuthGuardService]},
  { path:'logout', component: LogoutComponent,canActivate:[AuthGuardService]},
  { path:'posts', component: PostComponent,canActivate:[AuthGuardService]},
  { path:'upload', component: UserimageuploadComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
