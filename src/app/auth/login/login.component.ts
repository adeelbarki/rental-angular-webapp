import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage = '';

  ValidationMessages = {
    email: {
      required: 'Email is required',
    },
    password: {
      required: 'Password is required'
    }
  };

  constructor(private fb: FormBuilder, private auth: AuthService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe((params) => {
      if (params.registered === 'success') {
        this.notifyMessage = 'You have been successfuly registered!';

      }
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
                   Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isValidInput(field): boolean {
    return this.loginForm.controls[field].invalid &&
      (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched);
  }

  isRequired(field): boolean {
    return this.loginForm.controls[field].errors.required;
  }

  login() {
    this.auth.login(this.loginForm.value)
      .subscribe( (token) => {
        this.router.navigate(['/rentals']);
      }, (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
  }

}
