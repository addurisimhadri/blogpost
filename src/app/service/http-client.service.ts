import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Employee{
  constructor(
    public id:string,
    public ename:string,
    public designation:string,
    public salary:string,
    public add:String,
    public email:String,    
  ) {}
   
}
export class JwtResponse{
  constructor(
    public token:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) {  }
  getEmployees()
  { 
   console.log("test call token ::  "+sessionStorage.getItem("token1"));
    //const headers = new HttpHeaders({ Authorization: ""+sessionStorage.getItem("token") });  
    const headers = new HttpHeaders({ Authorization: ""+sessionStorage.getItem("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBcHBhbm5hIiwiZXhwIjoxNTg5NzM5OTM1LCJpYXQiOjE1ODk3MjE5MzV9.s2h0Il0-XlcJs8BueRHuuXAkj47TI9EGTtiFHjCcrz4Y6c_XNnsOBP0ItdrSxvFD6zMPXWibbHY6p7WTEgqF5g") });
    //console.log("test call"+headers.get("Authorization"));  
    return this.httpClient.get<Employee[]>("http://dev.wicore.in:8080/api/employees",{headers}); 
  }
  public deleteEmployee(employee) {
    const headers = new HttpHeaders({ Authorization: ""+sessionStorage.getItem("token") });
    console.log("test call"+headers.get("Authorization"));  
    return this.httpClient.delete<Employee>("http://dev.wicore.in:8080/api/employees/employee" + "/"+ employee.id,{headers});
  }
  public createEmployee(employee) {    
    const headers = new HttpHeaders({ Authorization: ""+sessionStorage.getItem("token") });
    console.log("Employee ."+headers.get("Authorization")); 
    return this.httpClient.post<Employee>("http://dev.wicore.in:8080/api/employees/create", employee,{headers});
  }


}
