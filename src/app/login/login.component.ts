import { Component, OnInit } from '@angular/core';
import { AuthenticationService,User } from '../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin = false
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router,private authser: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
  checkLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value};
    (this.authser.authenticate(loginPayload).subscribe(
      data => {
        this.router.navigate(['home'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      }
    )
    );

  }
}
