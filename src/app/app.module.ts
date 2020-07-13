import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeserviceService } from './employeeservice.service';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { InterceptorService } from './services/interceptor.service';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { PostComponent } from './post/post.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatSidenavModule } from '@angular/material/sidenav';
import {  MatMenuModule } from '@angular/material/menu';
import {  MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostserviceService } from './services/postservice.service';
import { ImageserviceService } from './services/imageservice.service';
import { UserimageuploadComponent } from './userimageupload/userimageupload.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    EditemployeeComponent,
    ParentComponent,
    ChildComponent,
    PostComponent,
    ListPostsComponent,
    UserimageuploadComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatPaginatorModule
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true},
    EmployeeserviceService,
    PostserviceService,
    ImageserviceService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
