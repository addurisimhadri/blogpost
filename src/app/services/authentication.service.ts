import { Injectable,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
export class User{
  constructor(
    public status:string,
     ) {}  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() getLoggedInUserId: EventEmitter<any> = new EventEmitter();
  //web_url : any="http://dev.wicore.in:8080";
  web_url : any="http://localhost:2018";
  constructor(private httpClient:HttpClient) { }

  authenticate(loginPayload) {
    //alert(loginPayload.username+""+loginPayload.password);
    let username=loginPayload.username;
    let password=loginPayload.password;
    return this.httpClient
      .post<any>(this.web_url+"/cmsapi/authenticate", { username, password})
      .pipe(
        map(userData => {
          //alert("===========");
          this.getLoggedInUserId.emit(userData.userId);
          sessionStorage.setItem("web_url", this.web_url);
          sessionStorage.setItem("username", userData.token);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("userId", userData.userId);
          console.log("userId::"+userData.userId+" | tokenStr::  "+tokenStr); 
          return userData;
        })      );
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }
  logOut() { 
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userId')
  }
  
}
