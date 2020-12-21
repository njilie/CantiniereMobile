import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value).subscribe(
        (data) => {
        this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          if (error.error.status === 401) {
            console.log('L\'email n\'existe pas');
          }
        }
      );
    }
  }

}
