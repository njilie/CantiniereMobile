import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ImageOUT } from 'src/app/shared/interfaces/image';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

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
      console.log(" utilisateur"+this.user.id);
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
