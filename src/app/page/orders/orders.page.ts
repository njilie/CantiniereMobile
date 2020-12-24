import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ConstraintIN } from 'src/app/shared/interfaces/constraint';
import { ImageOUT } from 'src/app/shared/interfaces/image';
import { OrderOUT, PriceOUT, OrderIN } from 'src/app/shared/interfaces/order';
import { QuantityOUT, QuantityIN } from 'src/app/shared/interfaces/quantity';
import { User } from 'src/app/shared/interfaces/user';
import { ConstraintService } from 'src/app/shared/services/constraint.service';
import { MealService } from 'src/app/shared/services/meal.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  allOrdersUrl: string;
  user: User /*UserOUT*/;
  orders: OrderOUT[];
  menusImages: ImageOUT[] = [];
  mealsImages: ImageOUT[] = [];
  totalsPrices: PriceOUT[] = [];
  maximumOrderPerDay: number;
  orderTimeLimit: string;
  loading: boolean;

  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private menuService: MenuService,
    private mealService: MealService,
    private constraintService: ConstraintService,
    private route: ActivatedRoute,
    public alertController: AlertController) { }

  ngOnInit(): void {
    this.loading = true;

    this.allOrdersUrl = this.route.snapshot.paramMap.get('all');

    if (localStorage.getItem('userChangedValues')) {
      this.user = JSON. parse(localStorage.getItem('userChangedValues'));
    }
    else {
      this.user = this.auth.userLogged();
    }

    if (this.user) {
      if (this.allOrdersUrl) {
        this.getAllOrdersOfUser(this.user.id);
      } else {
        this.getOngoingOrdersOfUser(this.user.id);
      }
    } else {
      console.log('VOUS DEVEZ ETRE CONNECTE');
    }
  }

  getOngoingOrdersOfUser(userId: number): void {
    this.orderService.getOngoingOrdersOfUser(userId).subscribe(
      (orders) => {
        this.orders = orders;console.log(this.orders);

        this.orders.forEach((order) => {
          // this.imageMenu(order.quantity);
          // this.imageMeal(order.quantity);
        });

        if (this.orders[0]) {
          this.computePrice(this.orders[0].id, 2);
        }

        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllOrdersOfUser(userId: number): void {
    this.orderService.getAllOrdersOfUser(userId).subscribe(
      (orders) => {
        this.orders = orders;console.log(this.orders);
        this.orders.forEach((order) => {
          // this.imageMenu(order.quantity);
          // this.imageMeal(order.quantity);
          this.computePrice(order.id, 2);
        });

        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  imageMenu(quantities: QuantityOUT[]): void {
    quantities.forEach((quantity) => {
      this.menuService.getMenuImage(quantity.menu.imageId).subscribe(
        (image) => {
          this.menusImages.push(image);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  imageMeal(quantities: QuantityOUT[]): void {
    quantities.forEach((quantity) => {
      this.mealService.getMealImage(quantity.meal.imageId).subscribe(
        (image) => {
          this.mealsImages.push(image);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  computePrice(ongoingOrderId: number, constraintId: number): void {
    this.orderService.computePrice(ongoingOrderId, constraintId).subscribe(
      (totalPrice) => {
        this.totalsPrices.push(totalPrice);
      },
      (error) => {
        console.log(error);
      });
  }

  async makeOrder(ongoingOrderId: number): Promise<void> {
    if (this.orders && this.totalsPrices) {

      const confirm = await this.alertController.create({
        header: 'Attention !',
        message: 'Etes-vous sûr de vouloir payer cette commande ?',
        buttons: [
          { text: 'Non', role: 'cancel' },
          {
            text: 'Oui',
            handler: () => {
              
              this.loading = true;

              // if (this.user.wallet > this.totalsPrices[0].priceVAT) {

              this.constraintService.constraint(1).subscribe(
                  async (constraint) => {
                    // this.orderTimeLimit = constraint.orderTimeLimit as string;
                    // const currentTime = new Date().toLocaleTimeString();
                    this.maximumOrderPerDay = constraint.maximumOrderPerDay;

                    // if (currentTime < this.orderTimeLimit) {

                    if (this.maximumOrderPerDay > 0) {

                      this.orderService.makeOrder(ongoingOrderId, 1).subscribe(
                        (data) => {
                          localStorage.setItem('userChangedValues', JSON.stringify(data.user));

                          const updatedConstraint: ConstraintIN = {
                            orderTimeLimit: constraint.orderTimeLimit as string,
                            maximumOrderPerDay: constraint.maximumOrderPerDay - 1,
                            rateVAT: constraint.rateVAT
                          };
                          this.constraintService.update(constraint.id, updatedConstraint).subscribe(
                            async () => {
                              const alert = await this.alertController.create({
                                header: 'Succès !',
                                message: 'Commande effectuée avec succès',
                                buttons: [
                                  {
                                    text: 'OK',
                                    handler: () => {
                                      location.reload();
                                    }
                                  }
                                ]
                              });
                          
                              await alert.present();
                            });
                        },
                        async (error) => {
                          console.log(error);
                          if (error.status === 412 && error.error.exceptionMessage.includes('n\'a pas assez d\'argent')) {
                            this.loading = false;
                            const alert = await this.alertController.create({
                              header: 'Erreur !',
                              message: 'Il n\'y a pas assez d\'argent. Veuillez réalimenter la cagnotte',
                              buttons: ['OK']
                            });
                        
                            await alert.present();
                          }
                        });

                    } else {
                      this.loading = false;
                      const alert = await this.alertController.create({
                        header: 'Erreur !',
                        message: 'Trop de commandes aujourd\'hui, il faut attendre demain',
                        buttons: ['OK']
                      });
                  
                      await alert.present();
                    }

                    // } else {
                    //   alert('Une commande ne peut être effectuée qu\'avant 10h30');
                    // }
                  },
                  (error) => {
                    console.log(error);
                  });

              // } else {
              //   alert('Vous n\'avez pas assez d\'argent sur votre compte, veuillez donner assez d\'argent à la cantinière');
              // }
              
            }
          }
        ]
      });

      await confirm.present();

    }
  }

  async removeOrder(ongoingOrderId: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Attention !',
      message: '<strong>Etes-vous sûr de vouloir annuler cette commande ?</strong>',
      buttons: [
        { text: 'Non', role: 'cancel' },
        {
          text: 'Oui',
          handler: () => {
            
            this.loading = true;

            this.orderService.delete(ongoingOrderId).subscribe(
              async () => {
                const alert = await this.alertController.create({
                  header: 'Succès !',
                  message: 'Commande annulée avec succès',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        location.reload();
                      }
                    }
                  ]
                });
            
                await alert.present();
              },
              (error) => {
                console.log(error);
              });

          }
        }
      ]
    });

    await alert.present();
  }

  async removeFromOrder(
    orderToUpdateId: number,
    quantity: QuantityOUT[],
    quantityToDeleteId: number): Promise<void> {
    if (quantity.length === 1) {
      this.removeOrder(orderToUpdateId);
    } else {
      const confirm = await this.alertController.create({
        header: 'Attention !',
        message: 'Etes-vous sûr de vouloir retirer ce produit du panier ?',
        buttons: [
          { text: 'Non', role: 'cancel' },
          {
            text: 'Oui',
            handler: () => {
              
              this.loading = true;

              // On crée une variable newQuantity qui contiendra toutes nos quantités(repas/menus)
              const newQuantity: QuantityIN[] = [];

              // On supprime, de l'array contenant toutes les quantités(repas/menus)
              // de la commande, la quantité(repas/menus) choisie pas l'utilisateur
              quantity = quantity.filter(element => element.id !== quantityToDeleteId);

              // Ensuite, on parcours l'array contenant toutes les quantités(repas/menus)
              // de la commande
              quantity.forEach(element => {
                // A chaque boucle,
                // on ajoute, à l'array newQuantity, les données qui nous intéressent
                newQuantity.push({
                  quantity: element.quantity,
                  mealId: element.meal ? element.meal.id : null,
                  menuId: element.menu ? element.menu.id : null
                });
              });

              // Enfin, on ajoute toutes les quantités dans la variable updatedContent
              const updatedContent: OrderIN = {
                userId: this.user.id,
                constraintId: 2,
                quantity: newQuantity
              };

              this.orderService.update(orderToUpdateId, updatedContent).subscribe(
                async () => {
                  const alert = await this.alertController.create({
                    header: 'Succès !',
                    message: 'Produit supprimé du panier',
                    buttons: [
                      {
                        text: 'OK',
                        handler: () => {
                          this.ngOnInit();
                        }
                      }
                    ]
                  });
              
                  await alert.present();
                },
                async (error) => {
                  console.log(error);
                  if (error.status === 412 && error.exceptionMessage === 'L\'heure authorisée pour passer une commande est dépassée') {
                    const alert = await this.alertController.create({
                      header: 'Erreur !',
                      message: 'La modification d\'un élément au panier ne peut se faire qu\'avant 10h30',
                      buttons: ['OK']
                    });
                
                    await alert.present();
                  }
                }
              );

            }
          }
        ]
      });
  
      await confirm.present();
    }
  }

}
