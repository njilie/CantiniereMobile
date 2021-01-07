import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ImageOUT, ImageIN } from 'src/app/shared/interfaces/image';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User /*UserOUT*/;
  profilePicture: ImageOUT;
  newProfilePicture: ImageIN;
  registrationDate: number[];
  form: FormGroup;
  loading: boolean;
  showBtnSavePic = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    public alertController: AlertController) {}

  ngOnInit(): void {
    if (localStorage.getItem('userChangedValues')) {
      this.user = JSON. parse(localStorage.getItem('userChangedValues'));
    }
    else {
      this.user = this.auth.userLogged();
    }

    this.userImage(this.user.id);

    this.form = this.fb.group({
      imagePath: [''],
      address: [''],
      postalCode: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ],
      email: ['', Validators.required],
      password: [''],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ],
      town: [''],
      sex: ['', Validators.required],
    });
  }

  // get sex() {
  //   return this.form.get('sex');
  // }

  userImage(userId: number): void {
    this.userService.userImage(userId).subscribe(
      (data) => {
        this.profilePicture = data;
        //console.log(this.profilePicture);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async onSubmit(): Promise<void> {
    console.log(this.user);
    console.log(this.form.value);
    if (this.form.valid) {
      // if (confirm('Etes-vous sûr de vouloir modifier vos informations ?')) {
      //   this.loading = true;

      //   this.user.sex = +this.form.get('sex').value;

      //   this.userService.update(this.user.id, this.form.value).subscribe(
      //     (data) => {
      //       localStorage.setItem('userChangedValues', JSON.stringify(data));
      //       this.user = data;
      //       this.loading = false;
      //       this.alertController.create({
      //         header: 'Succès !',
      //         message: 'Informations mofifiées',
      //         buttons: ['OK']
      //       });
      //     },
      //     (error) => {
      //       console.log(error);
      //     }
      //   );
      // }
      const confirm = await this.alertController.create({
        header: 'Attention !',
        message: 'Etes-vous sûr de vouloir modifier vos informations ?',
        buttons: [
          { text: 'Non', role: 'cancel' },
          {
            text: 'Oui',
            handler: () => {
              this.loading = true;

              // this.userService.update(this.user.id, this.form.value).subscribe(
              //   async (data) => {
              //     localStorage.setItem('userChangedValues', JSON.stringify(data));
              //     this.user = data;
              //     this.loading = false;

              //     const alert = await this.alertController.create({
              //       header: 'Succès !',
              //       message: 'Informations mofifiées',
              //       buttons: ['OK']
              //     });

              //     await alert.present();
              //   },
              //   (error) => {
              //     console.log(error);
              //   }
              // );
            }
          }
        ]
      });

      await confirm.present();
    }
  }

  convertBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newProfilePicture = {
        image64: reader.result as string,
        imagePath: this.form.get('imagePath').value
      };
      this.user.image = this.newProfilePicture;
      console.log(this.newProfilePicture);
      this.showBtnSavePic = true;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  saveProfilePicture(): void {
    if (confirm('Etes-vous sûr de vouloir changer de photo de profil ?')) {
      this.userService.updateImage(this.user.id, this.newProfilePicture).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('userChangedValues', JSON.stringify(data));
          alert('Photo de profil mofifiées succès');
          this.alertController.create({
            header: 'Succès !',
            message: 'Photo de profil mofifiée',
            buttons: ['OK']
          });
          this.showBtnSavePic = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
