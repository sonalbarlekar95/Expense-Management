import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | any;
  error: any;
  // snackBarRef = snackBar.open('Message archived', 'Undo');

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((resp: any) => {
        if (resp) {
          this.snackBar.open('Login Success.!');
          this.router.navigate(['home']);
        }
      }, (error: any) => {
        this.snackBar.open('Login Failed.!');
      })
    }
  }

  get f() {
    return this.loginForm && this.loginForm.controls
  }

  recoverPassword() {
    console.log("this.loginForm.value.email", this.loginForm.controls.email.value)
    if (this.loginForm.controls.email.value) {
      this.authService.recoverPassword(this.loginForm.controls.email.value).subscribe((resp: any) => {
        if (resp) {
          this.snackBar.open('You can recover the password from your email account.!', 'Ok', {
            duration: 5000
          });
        } else {
          this.snackBar.open('Error occured', 'Ok', {
            duration: 5000
          });
        }
      }, (error: any) => {
        this.snackBar.open(error.message, 'Ok', {
          duration: 5000
        });
      });
    } else {
      this.snackBar.open('Please enter email address to recover password.!', 'Ok', {
        duration: 5000
      });
    }
  }

}
