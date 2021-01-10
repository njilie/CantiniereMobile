import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-newmeal',
  templateUrl: './newmeal.page.html',
  styleUrls: ['./newmeal.page.scss'],
})
export class NewmealPage implements OnInit {

  newmeal: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private router: Router) {

      this.newmeal = this.formBuilder.group({
        label: ['', Validators.required],
        priceDF: ['', Validators.required],
        description: ['', Validators.required],
        ingredientsId: this.formBuilder.array([]),
        availableForWeeks: this.formBuilder.array([])    
      })
      
     }

  ngOnInit() {
  }

      // créer une méthode qui retourne  ingredientsId et availableForWeeks
      getIngredientsId(): FormArray {
        return this.newmeal.get('ingredientsId') as FormArray;
      }
      getAvailableForWeeks(): FormArray {
        return this.newmeal.get('availableForWeeks') as FormArray;
      }
    
      //créer la méthode qui permet d'ajouter un  FormControl  à ingredientsId et à availableForWeeks
      onAddIngredientsId() {
        const newingredientsId = this.formBuilder.control(null, Validators.required);
        this.getIngredientsId().push(newingredientsId);
      }
      onAddAvailableForWeeks() {
        const newavailableForWeeks = this.formBuilder.control(null, Validators.required);
        this.getAvailableForWeeks().push(newavailableForWeeks);
      }

      onSubmit(){
        if (this.newmeal.valid) {
          this.adminService.saveMeals(this.newmeal.value).subscribe(
            (data) => {
              this.router.navigate([`/meals`]);
            },
            (error) => {
              if (error.status === 400) {
               console.log("Votre plat n'est pas valide");
              }
              if (error.status === 401) {
                console.log("Vous n'êtes pas connecté ou n'avez pas le droit");
              }
            }
          );
        }
      }
}
