import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService,Employee } from '../employeeservice.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  editForm: FormGroup;
  employee: Employee = new Employee("","","","","","");
  constructor(private router: Router,private employeeserviceService:EmployeeserviceService) { }

  ngOnInit(): void {
    let editEmpId = window.localStorage.getItem("editEmpId");
    if(!editEmpId) {
      alert("Invalid action.")
      this.router.navigate(['']);
      return;
    }
    this.employeeserviceService.getEmployeeById(editEmpId)
    .subscribe( data => {
      this.employee=data.result;
    });

  }
  updateEmployee(): void {
    this.employeeserviceService.updateEmployee(this.employee)
        .subscribe( data => {
          alert(data.message);
          this.router.navigate([''])
        });
  };
  cancel(): void {   
          this.router.navigate([''])
  };
}
