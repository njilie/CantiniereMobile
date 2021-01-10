import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-manage-meal',
  templateUrl: './manage-meal.page.html',
  styleUrls: ['./manage-meal.page.scss'],
})
export class ManageMealPage implements OnInit {

  meal: any;
  paramId: Params;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.paramId = params['id'];
        this.get(+this.paramId)
      })
  }
  get(id: number): void {
    this.adminService.getMeal(id)
    .subscribe((data: any) => {
      this.meal = data;
    })
  }

  onClick(): void {
    this.adminService.updateMeal(this.meal.id, this.meal)
    .subscribe((data)=> {
      this.router.navigate(['/meals']);
    });
    
  }

}
