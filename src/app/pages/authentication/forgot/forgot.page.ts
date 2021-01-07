import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  userForm: FormGroup;
  message: string;
  clickSubmit = false;
  
  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private route: Router) {
      this.userForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ])]
      })
     }

  ngOnInit() {
  }

  get email(){
    return this.userForm.get('email');
  }

  onSubmit(){
    if (this.userForm.valid) {
      this.userService.forgotPassword(this.userForm.controls['email'].value).subscribe(
        (data) => {
          this.route.navigate(['/login']);
      },
      (error) => {
        if (error.status === 412) {
          this.message = "L'e-mail n'a pas été trouvé ou vous n'êtes pas dans notre BD";
        }
      });
    }
  }

  valide(){
    this.clickSubmit = true;
  }

}
