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
  submitted = false;
  clickSubmit = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
      this.userForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          //Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ])],
        password: ['', Validators.compose([
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[%!.&$?*]).{8,}$')
        ])]
      });
   }
   get email(){
     return this.userForm.get('email');
   }
   get password(){
     return this.userForm.get('password');
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
            this.message = "Vous n'avez pas bien saisi vos informations";
          }
        }
      );
    }
  }
  valide(){
    this.clickSubmit = true;
  }

}
