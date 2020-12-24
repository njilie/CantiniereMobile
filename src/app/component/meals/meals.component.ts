import { Component, OnInit } from '@angular/core';

import { MealService } from 'src/app/shared/services/meal.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

import { MealOUT } from 'src/app/shared/interfaces/meal';
import { ImageOUT } from 'src/app/shared/interfaces/image';
import { QuantityIN, QuantityOUT } from 'src/app/shared/interfaces/quantity';
import { User /*UserOUT*/} from 'src/app/shared/interfaces/user';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit {

  meals!: MealOUT[];
  mealsImages: ImageOUT[] = [];
  loading!: boolean;

  constructor(
    private mealService: MealService,
    private orderService: OrderService,
    private authService: AuthService,
    public alertController: AlertController) {}

  ngOnInit(): void {
    this.loading = true;
    this.getMealsForThisWeek();
  }

  getMealsForThisWeek(): void {
    this.mealService.getMealsForThisWeek().subscribe(
      (meals) => {
        this.meals = meals;
        this.loading = false;
        // this.meals.forEach((meal) => {
        //   this.mealService.getMealImage(meal.imageId).subscribe(
        //     (image) => {
        //       this.mealsImages.push(image);
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

  async orderMaker(mealId: number): Promise<void> {
    // if (confirm('Etes-vous sûr de vouloir ajouter ce plat au panier ?')) {

    //   this.loading = true;
    //   const user: User = this.authService.userLogged();
    //   if (user) {
    //     this.orderService.orderMaker(user.id, 'meal', mealId);
    //   }

    // }

    const confirm = await this.alertController.create({
      header: 'Attention !',
      message: 'Etes-vous sûr de vouloir ajouter ce plat au panier ?',
      buttons: [
        { text: 'Non', role: 'cancel' },
        {
          text: 'Oui',
          handler: () => {
            
            this.loading = true;
            const user: User = this.authService.userLogged();
            if (user) {
              this.orderService.orderMaker(user.id, 'meal', mealId);
            }

          }
        }
      ]
    });

    await confirm.present();
  }

}
