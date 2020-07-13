import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService,Employee } from '../employeeservice.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  editForm: FormGroup;
  employee: Employee = new Employee("","","","","","");
  constructor(private router: Router,private employeeserviceService:EmployeeserviceService) { }

  ngOnInit(): void {
    let empId = window.localStorage.getItem("editEmpId");
    if(!empId) {
      alert("Invalid action.")
      this.router.navigate(['']);
      return;
    }
    this.employeeserviceService.getEmployeeById(empId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }
  createEmployee(): void {
    this.employeeserviceService.createEmployee(this.employee)
        .subscribe( data => {
          this.router.navigate([''])
          alert("Employee created successfully.");
        });
  };
}
