import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.page.html',
  styleUrls: ['./manage-menu.page.scss'],
})
export class ManageMenuPage implements OnInit {

  menu: any;
  paramId: Params;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.paramId = params['id'];
          this.get(+this.paramId)
        });
    }
  
    get(id: number): void {
      this.adminService.getMenu(id)
      .subscribe((data: any) => {
        this.menu = data;
      })
    }
    onClick(): void {
      this.adminService.updateMenu(this.menu.id, this.menu)
      .subscribe((data)=> {
        this.router.navigate(['/menus']);
      });
      
    }

}
