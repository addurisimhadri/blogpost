import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService,Employee } from '../employeeservice.service';
import {Router} from "@angular/router";
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:Employee[];
  employee:Employee; 
  totalElements: number = 0;
  loading: boolean;
  constructor(private router: Router,private employeeserviceService:EmployeeserviceService) { }
  ngOnInit() {
   this.getAllEmployee({ page: "0", size: "5" });
  }
  getAllEmployee(request) : void{
    this.loading = true;
    this.employeeserviceService.getEmployees(request)
    .subscribe(
     response =>{
       this.employees = response['content'];
       this.totalElements = response['totalElements'];
       this.loading = false;
      }, error => {
        this.loading = false;
      }
    );
  }
  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getAllEmployee(request);
  }
  deleteEmployee(employee: Employee): void {
    this.employeeserviceService.deleteEmployee(employee)
      .subscribe( data => { 
        alert(data.message); 
        this.employees = this.employees.filter(e => e !== employee);
      })
  }; 
  editEmployee(employee: Employee): void {
    window.localStorage.removeItem("editEmpId");
    window.localStorage.setItem("editEmpId", employee.id.toString());
    this.router.navigate(['editemployee']);
  };
  addEmployee(): void {
    this.router.navigate(['addemployee']);
  };
}
