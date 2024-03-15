import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup | any;
  error: any;
  // snackBarRef = snackBar.open('Message archived', 'Undo');

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar,
    ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,20}$')]],
      password: ['', Validators.required],
    })
  }

  register() {
    if (this.registrationForm.valid) {
        this.authService.register(this.registrationForm.value).subscribe((resp: any) => {
            if(resp) {
              this.snackBar.open('Registration Success.!', 'Ok', { duration: 5000 });
              this.router.navigate(['home']);
            }
        }, (error: any) => {
          this.snackBar.open(error, 'Ok', { duration: 5000 });
        })
    }
  }

  get f() {
    return this.registrationForm && this.registrationForm.controls
  }

}
