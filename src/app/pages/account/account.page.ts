import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ImageOUT } from 'src/app/shared/interfaces/image';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User /*UserOUT*/;
  profilePicture: ImageOUT;

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.userInfos();
  }

  userInfos(): void {
    if (localStorage.getItem('userChangedValues')) {
      this.user = JSON. parse(localStorage.getItem('userChangedValues'));
    }
    else {
      this.user = this.authService.userLogged();
    }

    if (this.user) {
      this.userService.userImage(this.user.id).subscribe(
        (data) => {
          this.profilePicture = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
