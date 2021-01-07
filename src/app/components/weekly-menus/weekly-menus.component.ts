import { Component, OnInit } from '@angular/core';
import { ImageOUT } from 'src/app/shared/interfaces/image';
import { MenuOUT } from 'src/app/shared/interfaces/menu';
import { API_URL } from '../../shared/constants/api-url';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-weekly-menus',
  templateUrl: './weekly-menus.component.html',
  styleUrls: ['./weekly-menus.component.scss'],
})
export class WeeklyMenusComponent implements OnInit {

  menus!: MenuOUT[];
  menusImages: ImageOUT[] = [];
  loading!: boolean;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenusForThisWeek();
  }

  getMenusForThisWeek(): void {
    this.loading = true;

    this.menuService.getMenusForThisWeek().subscribe(
      (menus) => {
        this.menus = menus;
        this.loading = false;
        this.menus.forEach((menu) => {
          //this.menuService.getMenuImage(menu.imageId)
          this.menuService.getMenuImage(menu.id).subscribe(
            (image) => {
              //this.menusImages.push(image);
              menu.imgUrl = `${API_URL}/${image.imagePath}`;
            },
            (error) => {
              console.log(error);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
