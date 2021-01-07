import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  submitted = false;
  userForm: FormGroup;
  clickSubmit = false;
  message: string;
  
  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) {

      this.userForm = this.formBuilder.group({
        address: ['', Validators.required],
        postalCode: ['', Validators.required],
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[%!.&$*?]).{8,}$')
        ])],
        sex:[0, Validators.required]
      });
     }

  ngOnInit() {
  }

  get email(){
    return this.userForm.get('email');
  }
  get password(){
    return this.userForm.get('password');
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log("ici");
      this.userService.userRegister(this.userForm.value).subscribe(
        (data) => {
        this.router.navigate(['/login']);
        },
        (error) => {
          if (error.status === 400) {
            this.message = "Cet utilisateur n'est pas valide.";
          }
          if (error.status === 412) {
            this.message = "L'utilisateur est déjà dans la base de données (l'e-mail doit être unique) ou il y a un problème de rôle.";
          }
        }
      );
    }
  }

  valide(){
    this.clickSubmit = true;
  }
}
