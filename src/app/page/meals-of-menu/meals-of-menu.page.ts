import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuService } from 'src/app/shared/services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';

import { MenuOUT } from 'src/app/shared/interfaces/menu';
import { ImageOUT } from 'src/app/shared/interfaces/image';
import { User /*UserOUT*/} from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-meals-of-menu',
  templateUrl: './meals-of-menu.page.html',
  styleUrls: ['./meals-of-menu.page.scss'],
})
export class MealsOfMenuPage implements OnInit {

  menu!: MenuOUT;
  menuId!: number;
  menusImages!: ImageOUT[];
  loading!: boolean;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
    public alertController: AlertController) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.menuId = +params.get('id');
    });

    this.getMenu(this.menuId);
  }

  getMenu(menuId: number): void {
    this.loading = true;

    this.menuService.getMenu(menuId).subscribe(
      (menu) => {
        this.menu = menu;
        this.loading = false;
        // this.menus.forEach((menu) => {
        //   this.menuService.getMenuImage(menu.imageId).subscribe(
        //     (image) => {
        //       this.menusImages.push(image);
        //     },
        //     (error) => {
        //       console.log(error);
        //     }
        //   );
        // });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async orderMaker(menuId: number): Promise<void> {
    // if (confirm('Etes-vous sûr de vouloir ajouter ce menu au panier ?')) {

    //   this.loading = true;
    //   const user: User = this.authService.userLogged();
    //   if (user) {
    //     this.orderService.orderMaker(user.id, 'menu', null, menuId);
    //   }

    // }

    const confirm = await this.alertController.create({
      header: 'Attention !',
      message: 'Etes-vous sûr de vouloir ajouter ce menu au panier ?',
      buttons: [
        { text: 'Non', role: 'cancel' },
        {
          text: 'Oui',
          handler: () => {
            
            this.loading = true;
            const user: User = this.authService.userLogged();
            if (user) {
              this.orderService.orderMaker(user.id, 'menu', null, menuId);
            }

          }
        }
      ]
    });

    await confirm.present();
  }

}
